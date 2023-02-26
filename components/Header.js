import header from "@/styles/Header.module.css";
import { useWeb3Modal } from "@web3modal/react";
import { useAccount } from "wagmi";

function Header() {
  const { address, isConnected } = useAccount();
  const { open } = useWeb3Modal();

  return (
    <>
      <div className={header.header}>
        <button className={header.text}></button>
      </div>
    </>
  );
}
