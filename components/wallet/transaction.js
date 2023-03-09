import MultiSigAddressContext from "@/globalContext";
import { useContext, useEffect, useState } from "react";
import transact from "./transaction.module.css";
import getTxDetails from "@/utils/getTransactionDetails";

function Transaction({ view }) {
  const [tx_id, setTx_id] = useState(0);
  const [processTx, setProcessTx] = useState(false);
  const { multiSigAddress } = useContext(MultiSigAddressContext);

  const {
    data: txDetailsData,
    isError,
    isLoading,
  } = getTxDetails(multiSigAddress, tx_id, processTx);

  const proceed = () => {
    setProcessTx(true);
  };

  useEffect(() => {
    if (txDetailsData != null) {
      console.log("Printing Transaction Details");
      console.log(txDetailsData);
      console.log("Legth is currently ", txDetailsData.length);
      for (let i = 0; i < txDetailsData.length; i++) {
        console.log(i, "is currently", txDetailsData[i]);
      }
    }
  }, [txDetailsData]);

  return (
    <div className={transact.main} id={view == 2 ? "" : transact.notActive}>
      <div className={transact.title}>Show Transactions Details</div>
      <div className={transact.input}>
        <input
          type="number"
          placeholder="Enter Transaction Id"
          value={tx_id}
          onChange={(e) => setTx_id(e.target.value)}
        />
      </div>
      <button onClick={proceed}> Show Transaction Details</button>

      <div className={transact.details}>
        <div className={transact.recepient}>
          <span>recepient Address:</span>
          <span>{`${txDetailsData[0]}`}</span>
        </div>
        <div className={transact.etherSent}>
          <span>Amount of Ether sent:</span>
          <span>{`${txDetailsData[1]} Ethers`}</span>
        </div>
        <div className={transact.callData}>
          <span>callData:</span>
          <span>{`${txDetailsData[2]}`}</span>
        </div>
        <div className={transact.executed}>
          <span>Is Transaction executed:</span>
          <span>{txDetailsData[3] ? "Yes" : "No"}</span>
        </div>
        <div className={transact.authorize}>
          <span>Number of Authorization:</span>
          <span>{`${txDetailsData[4]}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
