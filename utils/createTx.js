import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "./abi";

function createTransactionTx(
  multiSigAddress,
  receipientAddress,
  amountEther,
  callData,
  error
) {
  const { config } = usePrepareContractWrite({
    address: multiSigAddress,
    abi: abi["multiSigWallet"],
    functionName: "createTransaction",
    args: [receipientAddress, amountEther, callData],
  });

  return useContractWrite({
    ...config,
    onError(e) {
      console.log("A CreateTx Error occured");
      error();
    },
  });
}

export default createTransactionTx;
