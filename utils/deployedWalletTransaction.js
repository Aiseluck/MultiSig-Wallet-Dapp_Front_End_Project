import { useContractRead } from "wagmi";
import abi from "./abi";
import walletFactoryAddress from "./address";

function checkDeployedWalletTx(walletName, processTx) {
  const contractRead = useContractRead({
    address: processTx && walletFactoryAddress,
    abi: abi["walletFactory"],
    functionName: "deployedWallets",
    args: [walletName],
  });
  return contractRead;
}

export default checkDeployedWalletTx;
