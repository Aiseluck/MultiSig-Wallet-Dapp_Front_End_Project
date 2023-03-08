import { useContractRead } from "wagmi";
import abi from "./abi";

function checkAddressOwner(walletAddress, address) {
  const contractRead = useContractRead({
    address: walletAddress,
    abi: abi["multiSigWallet"],
    functionName: "AddressIsOwner",
    args: [address],
  });
  return contractRead;
}

export default checkAddressOwner;
