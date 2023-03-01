import { useContractRead } from "wagmi";
import abi from "./abi";
import walletFactoryAddress from "./address";

function checkDeployedWalletTx(walletName) {
  const contractRead = useContractRead({
    address: walletFactoryAddress,
    abi: abi["walletFactory"],
    functionName: "deployedWallets",
    args: [walletName],
  });

  return contractRead;
}

export default checkDeployedWalletTx;
