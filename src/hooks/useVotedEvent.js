import { useEffect } from "react";
import useContract from "./useContract";
import { toast } from "react-toastify";

const useVotedEvent = () => {
    const contract = useContract();

    useEffect(() => {
        if (!contract) return;

        const handleVoted = (proposalId, voter) => {
            toast.info(`Vote cast by ${voter} on proposal ${proposalId}`);
            console.log("Voted Event:", { proposalId, voter });
        };

        // Add the listener for the event
        contract.on("Voted", handleVoted);

        // Clean up the listener when the component unmounts or contract changes
        return () => {
            contract.off("Voted", handleVoted);
        };
    }, [contract]);
};

export default useVotedEvent;
