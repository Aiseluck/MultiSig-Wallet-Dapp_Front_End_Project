import MultiSigAddressContext from "@/globalContext";
import { utils } from "ethers";
import { use, useContext, useEffect, useState } from "react";
import auth from "./authorize.module.css";
import createTransactionTx from "@/utils/createTx";
import ProceedTx from "@/utils/authorizationTx";
import checkHex from "@/utils/checkHex";

function Authorize({ view }) {
  const [focus, setFocus] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [addressOk, setAdressOk] = useState(false);
  const [ethInput, setEthInput] = useState(0);
  const [parse_eth, setParse_eth] = useState(0);
  const [callData, setCallData] = useState("0x");
  const [isvalidCallData, setisValidCallData] = useState(true);
  const [authorize_id, setAuthorize_id] = useState(0);
  const [execute_id, setExecute_id] = useState(0);
  const { multiSigAddress, isAddressOwner } = useContext(
    MultiSigAddressContext
  );
  const [createTxResult, setCreateTxResult] = useState("pending");

  //For Hanfling Animate of Result whether failed or Succsessfull

  const createTxOutcome = (_result) => {
    setCreateTxResult(_result);
    setTimeout(() => setCreateTxResult("pending"), 8000);
  };

  useEffect(() => {
    if (utils.isAddress(sendAddress)) setAdressOk(true);
    else setAdressOk(false);
  }, [sendAddress]);

  const toggle = (value) => {
    if (focus == value) setFocus("");
    else setFocus(value);
  };

  const handleCallDataChange = (e) => {
    if (checkHex(e.target.value)) {
      setisValidCallData(true);
    } else setisValidCallData(false);
    setCallData(e.target.value);
  };

  // console.log("Arrayfying is ", utils.arrayify("0xff"));

  useEffect(() => {
    if (ethInput != "")
      setParse_eth(utils.parseEther(`${ethInput}`).toString());
  }, [ethInput]);

  //For Crrating the Transaction parameter to the Blockchain

  const createError = () => {
    console.log("An Error occured when creating Transaction");
    createTxOutcome("failed");
  };

  const { data: TransactionResponse, write } = createTransactionTx(
    addressOk && multiSigAddress,
    sendAddress,
    parse_eth,
    isvalidCallData ? utils.arrayify(callData) : utils.arrayify("0x"),
    createError
  );

  const createTx = () => {
    console.log("Address is ", sendAddress);
    console.log("Amount of Ethers to send is", parse_eth);
    console.log("CallData is ", callData);
    if (write != null) write();
  };

  useEffect(() => {
    if (TransactionResponse != null) {
      console.log("Printing Transaction Response");
      console.log(TransactionResponse);
      TransactionResponse.wait(1).then((TransactionReceipt) => {
        console.log("Printing the Transaction Receipt");
        console.log(TransactionReceipt);
        createTxOutcome("success");
      });
    }
  }, [TransactionResponse]);

  //End of the Creating Transaction for the Blockchain

  //For the Authorization of Transaction to the Blockchain

  const AuthorizeError = () => {
    console.log("An Error occured when Authorizing theTransaction");
  };

  const { data: AuthTransactionResponse, write: auth_write } = ProceedTx(
    !(authorize_id === "" || authorize_id < 0) && multiSigAddress,
    authorize_id,
    "authorizeTransaction",
    AuthorizeError
  );

  const AuthTx = () => {
    console.log("Sending the Authorize Transaction");
    if (auth_write != null) auth_write();
  };

  useEffect(() => {
    if (AuthTransactionResponse != null) {
      console.log("Printing Transaction response");
      console.log(AuthTransactionResponse);
      AuthTransactionResponse.wait(1).then((TransactionReceipt) => {
        console.log("Printing Transaction receipt");
        console.log(TransactionReceipt);
      });
    }
  }, [AuthTransactionResponse]);

  return (
    <div className={auth.main} id={view == 1 ? "" : auth.notActive}>
      <div className={auth.createTx}>
        <div
          className={auth.title}
          onClick={() => {
            toggle("create");
          }}
        >
          <div>Create Transaction</div>
          <div
            className={auth.drawer}
            id={focus != "create" ? auth.draw_hid : ""}
          >
            <img src="drawer.svg" />
          </div>
        </div>
        <div
          className={auth.txCreation}
          id={focus != "create" ? auth.hidden : ""}
        >
          <div className="recipent">
            <input
              placeholder="Enter Receipent Addresss"
              value={sendAddress}
              onChange={(e) => setSendAddress(e.target.value)}
            />
            <p>Enter Receipent</p>
          </div>
          <div className="value">
            <input
              type="number"
              placeholder="Amount of Ether to Send"
              value={ethInput}
              onChange={(e) => setEthInput(e.target.value)}
            />
            <p>Amount of Ether</p>
          </div>
          <div className="CallData">
            <textarea
              rows="3"
              placeholder="CallData"
              value={callData}
              onChange={handleCallDataChange}
            />
            <p>CallData</p>
          </div>
          <button
            disabled={!(addressOk && isAddressOwner && isvalidCallData)}
            onClick={createTx}
          >
            {createTxResult == "pending"
              ? "Create Transaction"
              : createTxResult == "success"
              ? "Transaction created Successfully"
              : "Transaction Creation Failed"}
          </button>
        </div>
      </div>
      <div className={auth.authorize}>
        <div
          className={auth.title}
          onClick={() => {
            toggle("authorize");
          }}
        >
          <div>Authorize Transaction</div>
          <div
            className={auth.drawer}
            id={focus != "authorize" ? auth.draw_hid : ""}
          >
            <img src="drawer.svg" />
          </div>
        </div>
        <div
          className={auth.input}
          id={focus != "authorize" ? auth.hidden : ""}
        >
          <input
            type="number"
            placeholder="Enter Transaction Id"
            value={authorize_id}
            onChange={(e) => setAuthorize_id(e.target.value)}
          />
          <button
            disabled={authorize_id === "" || authorize_id < 0}
            onClick={AuthTx}
          >
            Authorize Transaction
          </button>
        </div>
      </div>
      <div className={auth.execute}>
        <div
          className={auth.title}
          onClick={() => {
            toggle("execute");
          }}
        >
          <div>Execute Transaction</div>
          <div
            className={auth.drawer}
            id={focus != "execute" ? auth.draw_hid : ""}
          >
            <img src="drawer.svg" />
          </div>
        </div>
        <div className={auth.input} id={focus != "execute" ? auth.hidden : ""}>
          <input
            type="number"
            placeholder="Enter Transaction Id"
            value={execute_id}
            onChange={(e) => {
              setExecute_id(e.target.value);
            }}
          />
          <button disabled={execute_id === "" || execute_id < 0}>
            Execute Transaction
          </button>
        </div>
      </div>
    </div>
  );
}

export default Authorize;
