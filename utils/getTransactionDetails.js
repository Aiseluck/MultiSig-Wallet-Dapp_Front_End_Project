import { useContractRead } from "wagmi";
import abi from "./abi";

function getTxDetails(multiSigAddress, tx_index, processTx) {
  const contractRead = useContractRead({
    address: processTx && multiSigAddress,
    abi: abi["multiSigWallet"],
    functionName: "getTransactionDetails",
    args: [tx_index],
  });
  return contractRead;
}

export default getTxDetails;
