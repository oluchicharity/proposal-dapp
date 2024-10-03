import { Box } from "@radix-ui/themes";
import Layout from "./components/Layout";
import CreateProposalModal from "./components/CreateProposalModal";
import Proposals from "./components/Proposals";
import useContract from "./hooks/useContract";
import { useCallback, useEffect, useState } from "react";
import { Contract } from "ethers";
import useRunners from "./hooks/useRunners";
import { Interface } from "ethers";
import ABI from "./ABI/proposal.json";

const multicallAbi = [
    "function tryAggregate(bool requireSuccess, (address target, bytes callData)[] calls) returns ((bool success, bytes returnData)[] returnData)",
];

function App() {
    const readOnlyProposalContract = useContract(true);
    const { readOnlyProvider } = useRunners();
    const [proposals, setProposals] = useState([]);

    const fetchProposals = useCallback(async () => {
        if (!readOnlyProposalContract) return;
    
        const multicallContract = new Contract(
            import.meta.env.VITE_MULTICALL_ADDRESS,
            multicallAbi,
            readOnlyProvider
        );
    
        const itf = new Interface(ABI);
    
        try {
            // Call proposalCount and convert it to a number
            const proposalCount = await readOnlyProposalContract.proposalCount();
    
            // Check if proposalCount is 0
            if (Number(proposalCount) === 0) {
                console.warn("No proposals found.");
                return;
            }
    
            const proposalsIds = Array.from(
                { length: Number(proposalCount) },
                (_, i) => i
            );
    
            const calls = proposalsIds.map((id) => ({
                target: import.meta.env.VITE_CONTRACT_ADDRESS,
                callData: itf.encodeFunctionData("proposals", [id]),
            }));
    
            const responses = await multicallContract.tryAggregate.staticCall(
                true,
                calls
            );
    
            const decodedResults = responses.map((res) =>
                itf.decodeFunctionResult("proposals", res.returnData)
            );
    
            const data = decodedResults.map((proposalStruct) => ({
                description: proposalStruct.description,
                amount: proposalStruct.amount,
                minRequiredVote: proposalStruct.minVotesToPass,
                votecount: proposalStruct.voteCount,
                deadline: proposalStruct.votingDeadline,
                executed: proposalStruct.executed,
            }));
    
            setProposals(data);
            console.log("Fetched proposals:", data);
        } catch (error) {
            console.error("Error fetching proposals: ", error);
        }
    }, [readOnlyProposalContract, readOnlyProvider]);
    
    useEffect(() => {
        fetchProposals();
    }, [fetchProposals]);

    return (
        <Layout>
            <Box className="flex justify-end p-4">
                <CreateProposalModal />
            </Box>
            <Proposals proposals={proposals} />
        </Layout>
    );
}

export default App;
