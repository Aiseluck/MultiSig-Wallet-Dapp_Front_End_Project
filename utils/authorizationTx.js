import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "./abi";

function ProceedTx(multiSigAddress, tx_index, functionselector, error) {
  const { config } = usePrepareContractWrite({
    address: multiSigAddress,
    abi: abi["multiSigWallet"],
    functionName: functionselector,
    args: [tx_index],
  });

  return useContractWrite({
    ...config,
    onError(e) {
      console.log(`A ${functionselector}Error occured`);
      error();
    },
  });
}

export default ProceedTx;
