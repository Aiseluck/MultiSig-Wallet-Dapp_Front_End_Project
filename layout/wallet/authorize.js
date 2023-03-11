import MultiSigAddressContext from "@/globalContext";
import { utils } from "ethers";
import { use, useContext, useEffect, useState } from "react";
import auth from "./authorize.module.css";
import createTransactionTx from "@/utils/createTx";
import ProceedTx from "@/utils/authorizationTx";
import checkHex from "@/utils/checkHex";
import Button from "@/components/button";
import { useAccount } from "wagmi";

function Authorize({ view }) {
  const { address } = useAccount();
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

  const [createButtonUI, setCreateButtonUI] = useState("pending");
  const [authButtonUI, setAuthButtonUI] = useState("pending");
  const [executeButtonUI, setExecuteButtonUI] = useState("pending");

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
    console.log("An Error occured when creating Transaction");
    setCreateButtonUI("failed");
    setTimeout(() => setCreateButtonUI("pending"), 6000);
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
    if (write != null) {
      write();
      setCreateButtonUI("loading");
    }
  };

  useEffect(() => {
    if (TransactionResponse != null) {
      console.log("Printing Transaction Response");
      console.log(TransactionResponse);
      TransactionResponse.wait(1).then((TransactionReceipt) => {
        console.log("Printing the Transaction Receipt");
        console.log(TransactionReceipt);
        setCreateButtonUI("success");
        setTimeout(() => setCreateButtonUI("pending"), 6000);
      });
    }
  }, [TransactionResponse]);

  //End of the Creating Transaction for the Blockchain

  //For the Authorization of Transaction to the Blockchain

  const AuthorizeError = () => {
    console.log("An Error occured when Authorizing theTransaction");
    setAuthButtonUI("failed");
    setTimeout(() => setAuthButtonUI("pending"), 6000);
  };

  const { data: AuthTransactionResponse, write: auth_write } = ProceedTx(
    !(authorize_id === "" || authorize_id < 0) && multiSigAddress,
    authorize_id,
    "authorizeTransaction",
    AuthorizeError
  );

  const AuthTx = () => {
    console.log("Sending the Authorize Transaction");
    if (auth_write != null) {
      auth_write();
      setAuthButtonUI("loading");
    }
  };

  useEffect(() => {
    if (AuthTransactionResponse != null) {
      console.log("Printing Transaction response");
      console.log(AuthTransactionResponse);
      AuthTransactionResponse.wait(1).then((TransactionReceipt) => {
        console.log("Printing Transaction receipt");
        console.log(TransactionReceipt);
        setAuthButtonUI("success");
        setTimeout(() => setAuthButtonUI("pending"), 6000);
      });
    }
  }, [AuthTransactionResponse]);

  //End of Authorization

  //Start of execution
  const ExecuteError = () => {
    console.log("An error occured when executing the Transaction");
    setExecuteButtonUI("failed");
    setTimeout(() => setExecuteButtonUI("pending"), 6000);
  };

  const { data: ExecutionResponse, write: exe_write } = ProceedTx(
    !(execute_id === "" || execute_id < 0) && multiSigAddress,
    execute_id,
    "executeTransaction",
    ExecuteError
  );

  const ExecTx = () => {
    console.log("Sending the Execution Transaction");
    if (exe_write != null) {
      exe_write();
      setExecuteButtonUI("loading");
    }
  };

  useEffect(() => {
    if (ExecutionResponse != null) {
      console.log("Printing Transaction Response");
      console.log(ExecutionResponse);
      ExecutionResponse.wait(1).then((TransactionReceipt) => {
        console.log("Printing Transaction Receipt");
        console.log(TransactionReceipt);
        setExecuteButtonUI("success");
        setTimeout(() => setExecuteButtonUI("pending"), 6000);
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
            state={createButtonUI}
            clickFunction={createTx}
            isOk={[
              addressOk,
              isAddressOwner,
              isvalidCallData,
              address,
              write != null ||
                createButtonUI == "loading" ||
                createButtonUI == "success" ||
                createButtonUI == "failed",
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
            state={authButtonUI}
            clickFunction={AuthTx}
            isOk={[
              authorize_id != "",
              address,
              !(authorize_id < 0),
              auth_write != null ||
                authButtonUI == "loading" ||
                authButtonUI == "success" ||
                authButtonUI == "failed",
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
            state={executeButtonUI}
            clickFunction={ExecTx}
            isOk={[
              execute_id != "",
              address,
              !(execute_id < 0),
              exe_write != null ||
                executeButtonUI == "loading" ||
                executeButtonUI == "success" ||
                executeButtonUI == "failed",
            ]}
          />
        </div>
      </div>
    </div>
  );
}

export default Authorize;
