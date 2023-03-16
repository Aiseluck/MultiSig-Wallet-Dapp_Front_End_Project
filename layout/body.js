import body from "@/styles/Body.module.css";
import MultiSigCreation from "./walletCreation";
import MultiSigWallet from "./walletUsage";

function Body() {
  return (
    <>
      <div className={body.main}>
        <MultiSigCreation />
        <MultiSigWallet />
      </div>
    </>
  );
}

export default Body;
