import MultiSigAddressContext from "@/globalContext";
import header from "@/styles/Header.module.css";
import { useWeb3Modal } from "@web3modal/react";
import { useContext, useEffect, useState } from "react";
import { useAccount } from "wagmi";

function Header() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();
  const { multiSigAddress, isAddressOwner, walletEthBalance } = useContext(
    MultiSigAddressContext
  );

  // to avoid nextJs hyrdation issue when developing we need to get the status of the account after initial Render

  const [_address, setAddress] = useState(null);
  const [_isConnected, setIsConnected] = useState(null);

  useEffect(() => {
    setAddress(address);
    setIsConnected(isConnected);
  }, [address, isConnected]);

  //End of the fixing for Next Hydration issue

  return (
    <>
      <div className={header.header}>
        <div className={header.multiSigAddress}>
          {multiSigAddress
            ? isAddressOwner
              ? `Owner of MultSigWallet at ${multiSigAddress.slice(0, 6)}`
              : `Not a Owner of MultSigWallet at ${multiSigAddress.slice(0, 6)}`
            : "MultiSigWallet not Connected"}
          <div
            className={header.ethAmount}
          >{`Eth Balance: ${walletEthBalance}`}</div>
        </div>
        <button
          className={header.text}
          id={_isConnected ? header.connected : header.notconnected}
          onClick={open}
        >
          {_isConnected
            ? `Connected to ${_address.slice(0, 9)}`
            : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default Header;
