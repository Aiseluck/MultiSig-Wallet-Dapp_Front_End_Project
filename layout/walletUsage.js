import MultiSigAddressContext from "@/globalContext";
import { useContext, useState } from "react";
import wallet from "@/styles/wallet.module.css";
import NavBar from "./wallet/navBar";
import Authorize from "./wallet/authorize";
import Transaction from "./wallet/transaction";

function MultiSigWallet() {
  const { multiSigAddress, setMultiSigAddress } = useContext(
    MultiSigAddressContext
  );
  const [view, setView] = useState(1);

  const clip = () => {
    navigator.clipboard.writeText(multiSigAddress);
  };

  const importWallet = () => {
    setMultiSigAddress(null);
  };
  return (
    <div className={wallet.wallet} id={multiSigAddress ? "" : wallet.notActive}>
      <div className={wallet.operations}>
        <Authorize view={view} />
        <Transaction view={view} />
      </div>
      <div className={wallet.info}>
        <div className={wallet.address}>
          {`Wallet Address:  ${multiSigAddress}`}
          <div className={wallet.clipboard} onClick={clip}>
            <img src="./copy.png" />
          </div>
        </div>
        <div className={wallet.importation} onClick={importWallet}>
          Import a New Wallet <img src="./edit.png" />{" "}
        </div>
      </div>
      <NavBar page={[view, setView]} />
    </div>
  );
}

export default MultiSigWallet;
