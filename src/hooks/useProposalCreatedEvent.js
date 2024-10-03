import { useEffect } from "react";
import useContract from "./useContract";
import { toast } from "react-toastify";

const useProposalCreatedEvent = () => {
    const contract = useContract();

    useEffect(() => {
        if (!contract) return;

        const handleProposalCreated = (proposalId, description, recipient, amount, votingDeadline, minVotesToPass) => {
            toast.info(`Proposal Created: ID ${proposalId}, Description: ${description}`);
            console.log("Proposal Created:", {
                proposalId,
                description,
                recipient,
                amount,
                votingDeadline,
                minVotesToPass,
            });
        };

        
        contract.on("ProposalCreated", handleProposalCreated);

        
        return () => {
            contract.off("ProposalCreated", handleProposalCreated);
        };
    }, [contract]);
};

export default useProposalCreatedEvent;
