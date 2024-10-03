// import { useCallback } from "react";
// import { toast } from "react-toastify";
// import useContract from "./useContract";
// import { useAppKitAccount } from "@reown/appkit/react";
// import { useAppKitNetwork } from "@reown/appkit/react";
// import { liskSepoliaNetwork } from "../connection";
// //import { parseEther } from "ethers";
// const useVoteOnProposal = () => {
//     const contract = useContract(true);
//     const { address } = useAppKitAccount();
//     const { chainId } = useAppKitNetwork();

//     return useCallback(
//         async (proposalId) => {
//             if (!address) {
//                 toast.error("Connect your wallet!");
//                 return;
//             }
//             if (Number(chainId) !== liskSepoliaNetwork.chainId) {
//                 toast.error("You are not connected to the right network");
//                 return;
//             }
//             if (!contract) {
//                 toast.error("Cannot get contract!");
//                 return;
//             }

//             try {
//                 const tx = await contract.vote(proposalId);
//                 const receipt = await tx.wait();

//                 if (receipt.status === 1) {
//                     toast.success(`Vote casted successfully for proposal ${proposalId}`);
//                 } else {
//                     toast.error(`Failed to vote on proposal ${proposalId}`);
//                 }
//             } catch (error) {
//                 console.error("Error while voting on proposal: ", error);
//                 toast.error(`An error occurred while voting on proposal ${proposalId}`);
//             }
//         },
//         [address, chainId, contract]
//     );
// };

// export default useVoteOnProposal;
