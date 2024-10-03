import { useCallback } from "react";
import { toast } from "react-toastify";
import useContract from "./useContract";
import { useAppKitAccount } from "@reown/appkit/react";
import { useAppKitNetwork } from "@reown/appkit/react";
import { liskSepoliaNetwork } from "../connection";
//import { parseEther } from "ethers";

const useVoteProposal = () => {
    const contract = useContract(true);
    const { address } = useAppKitAccount();
    const { chainId } = useAppKitNetwork();
    return useCallback(
        async (proposalId) => {
            if (!proposalId) {
                toast.error("no proposal Id!");
                console.log("id present");
                return;
            }
            
            if (!address) {
                toast.error("Connect your wallet!");
                console.log("address present");
                return;
            }
            if (Number(chainId) !== liskSepoliaNetwork.chainId) {
                toast.error("You are not connected to the right network");
                console.log("chainId present");
                return;
            }

            if (!contract) {
                toast.error("Cannot get contract!");
                console.log("contract present");
                return;
            }

            try {
                const estimatedGas = await contract.vote.estimateGas(
                   proposalId
                );
                const tx = await contract.vote(
                  proposalId, 
                    {
                        gasLimit: (estimatedGas * BigInt(120)) / BigInt(100),
                    }
                );
                const reciept = await tx.wait();

                if (reciept.status === 1) {
                    toast.success("Voting successful");
                    return;
                }
                toast.error("Voting failed");
                return;
            } catch (error) {
                console.error("error while Voting for this proposal: ", error);
                toast.error("Proposal Voting errored");
            }
        },
        [address, chainId, contract]
    );
};

export default useVoteProposal;
