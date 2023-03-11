import MultiSigAddressContext from "@/globalContext";
import { useContext, useState } from "react";
import wallet from "@/styles/wallet.module.css";
import NavBar from "./wallet/navBar";
import Authorize from "./wallet/authorize";
import Transaction from "./wallet/transaction";

function MultiSigWallet() {
  const { multiSigAddress } = useContext(MultiSigAddressContext);
  const [view, setView] = useState(1);
  return (
    <div className={wallet.wallet} id={multiSigAddress ? "" : wallet.notActive}>
      <div className={wallet.operations}>
        <Authorize view={view} />
        <Transaction view={view} />
      </div>
      <NavBar page={[view, setView]} />
    </div>
  );
}

export default MultiSigWallet;
