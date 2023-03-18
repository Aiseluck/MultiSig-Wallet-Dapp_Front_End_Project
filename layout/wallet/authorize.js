import MultiSigAddressContext from "@/globalContext";
import { utils } from "ethers";
import { use, useContext, useEffect, useReducer, useState } from "react";
import auth from "./authorize.module.css";
import createTransactionTx from "@/utils/createTx";
import ProceedTx from "@/utils/authorizationTx";
import checkHex from "@/utils/checkHex";
import Button from "@/components/button";

const initialButtonUI = {
  create: "pending",
  auth: "pending",
  execute: "pending",
};

const buttonUI_reducer = (state, action) => {
  let newState = { ...state };
  newState[action.buttonType] = action.buttonState;
  return newState;
};

function Authorize({ view }) {
  const [focus, setFocus] = useState("");
  const [sendAddress, setSendAddress] = useState("");
  const [addressOk, setAdressOk] = useState(false);
  const [ethInput, setEthInput] = useState(0);
  const [parse_eth, setParse_eth] = useState(0);
  const [callData, setCallData] = useState("0x");
  const [isvalidCallData, setisValidCallData] = useState(true);
  const [authorize_id, setAuthorize_id] = useState("");
  const [execute_id, setExecute_id] = useState("");
  const {
    multiSigAddress,
    isAddressOwner,
    _address: address,
  } = useContext(MultiSigAddressContext);

  const [buttonUI, dispatchButtonUI] = useReducer(
    buttonUI_reducer,
    initialButtonUI
  );

  //For Hanfling Animate of Result whether failed or Succsessfull

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
    dispatchButtonUI({ buttonType: "create", buttonState: "failed" });
    setTimeout(
      () => dispatchButtonUI({ buttonType: "create", buttonState: "pending" }),
      6000
    );
  };

  const { data: TransactionResponse, write } = createTransactionTx(
    addressOk && multiSigAddress,
    sendAddress,
    parse_eth,
    isvalidCallData ? utils.arrayify(callData) : utils.arrayify("0x"),
    createError
  );

  const createTx = () => {
    if (write != null) {
      write();
      dispatchButtonUI({ buttonType: "create", buttonState: "loading" });
    }
  };

  useEffect(() => {
    if (TransactionResponse != null) {
      TransactionResponse.wait(1).then((TransactionReceipt) => {
        dispatchButtonUI({ buttonType: "create", buttonState: "success" });
        setTimeout(
          () =>
            dispatchButtonUI({ buttonType: "create", buttonState: "pending" }),
          6000
        );
      });
    }
  }, [TransactionResponse]);

  //End of the Creating Transaction for the Blockchain

  //For the Authorization of Transaction to the Blockchain

  const AuthorizeError = () => {
    dispatchButtonUI({ buttonType: "auth", buttonState: "failed" });
    setTimeout(
      () => dispatchButtonUI({ buttonType: "auth", buttonState: "pending" }),
      6000
    );
  };

  const { data: AuthTransactionResponse, write: auth_write } = ProceedTx(
    !(authorize_id === "" || authorize_id < 0) && multiSigAddress,
    authorize_id,
    "authorizeTransaction",
    AuthorizeError
  );

  const AuthTx = () => {
    if (auth_write != null) {
      auth_write();
      dispatchButtonUI({ buttonType: "auth", buttonState: "loading" });
    }
  };

  useEffect(() => {
    if (AuthTransactionResponse != null) {
      AuthTransactionResponse.wait(1).then((TransactionReceipt) => {
        dispatchButtonUI({ buttonType: "auth", buttonState: "sucess" });
        setTimeout(
          () =>
            dispatchButtonUI({ buttonType: "auth", buttonState: "pending" }),
          6000
        );
      });
    }
  }, [AuthTransactionResponse]);

  //End of Authorization

  //Start of execution
  const ExecuteError = () => {
    dispatchButtonUI({ buttonType: "execute", buttonState: "failed" });
    setTimeout(
      () => dispatchButtonUI({ buttonType: "execute", buttonState: "pending" }),
      6000
    );
  };

  const { data: ExecutionResponse, write: exe_write } = ProceedTx(
    !(execute_id === "" || execute_id < 0) && multiSigAddress,
    execute_id,
    "executeTransaction",
    ExecuteError
  );

  const ExecTx = () => {
    if (exe_write != null) {
      exe_write();
      dispatchButtonUI({ buttonType: "execute", buttonState: "loading" });
    }
  };

  useEffect(() => {
    if (ExecutionResponse != null) {
      ExecutionResponse.wait(1).then((TransactionReceipt) => {
        dispatchButtonUI({ buttonType: "execute", buttonState: "success" });
        setTimeout(
          () =>
            dispatchButtonUI({ buttonType: "execute", buttonState: "pending" }),
          6000
        );
      });
    }
  }, [ExecutionResponse]);

  //End of Execution

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
          <Button
            initialText={"Create Transaction"}
            failureText={"Transaction Creation Failed"}
            successText={"Transaction created Successfully"}
            state={buttonUI.create}
            clickFunction={createTx}
            isOk={[
              addressOk,
              isAddressOwner,
              isvalidCallData,
              address,
              write != null ||
                buttonUI.create == "loading" ||
                buttonUI.create == "success" ||
                buttonUI.create == "failed",
            ]}
          />
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
          <Button
            initialText={"Authorize Transaction"}
            failureText={"Authorization Failed"}
            successText={"Authorization Successful"}
            state={buttonUI.auth}
            clickFunction={AuthTx}
            isOk={[
              authorize_id != "",
              address,
              !(authorize_id < 0),
              auth_write != null ||
                buttonUI.auth == "loading" ||
                buttonUI.auth == "success" ||
                buttonUI.auth == "failed",
            ]}
          />
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
          {/* <button
            disabled={execute_id === "" || execute_id < 0}
            onClick={ExecTx}
          >
            Execute Transaction
          </button> */}
          <Button
            initialText={"Execute Transaction"}
            failureText={"Tx Execution Failed"}
            successText={"Tx Execution Successful"}
            state={buttonUI.execute}
            clickFunction={ExecTx}
            isOk={[
              execute_id != "",
              address,
              !(execute_id < 0),
              exe_write != null ||
                buttonUI.execute == "loading" ||
                buttonUI.execute == "success" ||
                buttonUI.execute == "failed",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Authorize;
