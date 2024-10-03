/* eslint-disable no-unused-vars */
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { formatEther } from "ethers";

const Proposal = ({
    amount,
    deadline,
    description,
    executed,
    minRequiredVote,
    votecount,
    onVote,
    proposalId,
}) => {
    const handleVote = () => {
        if (onVote && proposalId) {
            onVote(proposalId, true);
        }
    };

    return (
        <Box className={`proposal ${executed ? 'executed' : ''}`}>
            <Text>{description}</Text>
            <Text>Amount: {amount.toString()}</Text>
            <Text>Votes: {votecount}/{minRequiredVote}</Text>
            <Text>Deadline: {new Date(deadline * 1000).toLocaleString()}</Text>
            {!executed && (
                <Button onClick={handleVote}>Vote Yes</Button>
            )}
        </Box>
    );
};

export default Proposal;
