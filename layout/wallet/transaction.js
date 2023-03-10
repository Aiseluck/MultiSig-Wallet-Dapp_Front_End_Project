import MultiSigAddressContext from "@/globalContext";
import { useContext, useEffect, useRef, useState } from "react";
import transact from "./transaction.module.css";
import getTxDetails from "@/utils/getTransactionDetails";
import { formatEther } from "ethers/lib/utils.js";

function Transaction({ view }) {
  const [tx_id, setTx_id] = useState(0);
  const [processTx, setProcessTx] = useState(false);
  const { multiSigAddress } = useContext(MultiSigAddressContext);
  const [txValues, setTxValues] = useState([]);
  const inputElement = useRef();

  const {
    data: txDetailsData,
    isError,
    isLoading,
  } = getTxDetails(multiSigAddress, tx_id, processTx);

  const proceed = () => {
    setProcessTx(true);
    console.log(inputElement.current.value);
    setTx_id(inputElement.current.value);
  };

  useEffect(() => {
    if (txDetailsData != null) {
      console.log("Printing Transaction Details");
      console.log(txDetailsData);
      setTxValues(txDetailsData);
      console.log("Legth is currently ", txDetailsData.length);
      for (let i = 0; i < txDetailsData.length; i++) {
        console.log(i, "is currently", txDetailsData[i]);
      }
    } else setTxValues([]);
  }, [txDetailsData]);

  return (
    <div className={transact.main} id={view == 2 ? "" : transact.notActive}>
      <div className={transact.title}>Show Transactions Details</div>
      <div className={transact.input}>
        <input
          type="number"
          placeholder="Enter Transaction Id"
          ref={inputElement}
        />
      </div>
      <button onClick={proceed}> Show Transaction Details</button>

      <div className={transact.details}>
        <div className={transact.recepient}>
          <span className={transact.subtit}>Recepient Address:</span>
          <span>{`${txValues[0]}`}</span>
        </div>
        <div className={transact.etherSent}>
          <span className={transact.subtit}>Amount of Ether sent:</span>
          <span>
            {txValues[1] ? `${formatEther(txValues[1])} Ethers` : "null"}
          </span>
        </div>
        <div className={transact.callData}>
          <span className={transact.subtit}>callData:</span>
          <span>{`${txValues[2]}`}</span>
        </div>
        <div className={transact.executed}>
          <span className={transact.subtit}>Is Transaction executed:</span>
          <span>{txValues[3] ? "Yes" : "No"}</span>
        </div>
        <div className={transact.authorize}>
          <span className={transact.subtit}>Number of Authorization:</span>
          <span>{`${txValues[4]}`}</span>
        </div>
      </div>
    </div>
  );
}

export default Transaction;
