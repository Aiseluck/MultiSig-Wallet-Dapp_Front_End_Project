import header from "@/styles/Header.module.css";
import { useWeb3Modal } from "@web3modal/react";
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";

function Header() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

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
        <button
          className={header.text}
          id={_isConnected ? header.connected : header.notconnected}
          onClick={open}
        >
          {_isConnected
            ? `Connected to ${_address.slice(0, 6)}`
            : "Connect Wallet"}
        </button>
      </div>
    </>
  );
}

export default Header;
