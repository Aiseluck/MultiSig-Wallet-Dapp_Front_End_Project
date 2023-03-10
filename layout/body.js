import body from "@/styles/Body.module.css";
import MultiSig from "./getMultiSig";
import MultiSigWallet from "./walletUsage";

function Body() {
  return (
    <>
      <div className={body.main}>
        <MultiSig />
        <MultiSigWallet />
      </div>
    </>
  );
}

export default Body;
