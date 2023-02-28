import { useContractWrite, usePrepareContractWrite } from "wagmi";
import abi from "./abi";
import walletFactoryAddress from "./address";

function createWalletTx(
  walletName,
  owners,
  numOfConfirmation,
  processTx,
  error
) {
  const { config } = usePrepareContractWrite({
    address: processTx && walletFactoryAddress,
    abi: abi["walletFactory"],
    functionName: "createWallet",
    args: [walletName, owners, numOfConfirmation],
  });

  return useContractWrite({
    ...config,
    onError(e) {
      console.log("An Error has Occured", e);
      error();
    },
  });
}

export default createWalletTx;
