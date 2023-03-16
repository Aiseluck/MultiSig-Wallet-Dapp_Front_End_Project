import multiSig from "@/styles/multiSign.module.css";
import { useContext, useEffect, useReducer, useRef, useState } from "react";
import { utils } from "ethers";
import createWalletTx from "@/utils/createWalletTransaction";
import checkDeployedWalletTx from "@/utils/deployedWalletTransaction";
import checkAddressOwner from "@/utils/isAddressOwner";
import MultiSigAddressContext from "@/globalContext";
import { useAccount, useBalance } from "wagmi";
import { formatEther } from "ethers/lib/utils.js";
import Button from "@/components/button";

const initial_processTx = {
  importWallet: false,
  addressOk: false,
  checkDeployedWallet: false,
  isNewWalletName: false,
  createWallet: false,
};

const Process_Reducer = (state, action) => {
  let newState = { ...state };
  newState[action.type] = action.state;
  return newState;
};

const initialButtonUI = {
  import: "pending",
  create: "pending",
};

const buttonUI_reducer = (state, action) => {
  let newState = { ...state };
  newState[action.buttonType] = action.buttonState;
  return newState;
};

function MultiSigCreation() {
  const [importName, setImportName] = useState("");
  const [addressList, setAddressList] = useState([""]);
  const [numConfirmation, setNumConfirmation] = useState(1);
  const [walletName, setWalletName] = useState("");

  const [ProcessTx, dispatchProcess] = useReducer(
    Process_Reducer,
    initial_processTx
  );
  const [buttonUI, dispatchButtonUI] = useReducer(
    buttonUI_reducer,
    initialButtonUI
  );

  const {
    multiSigAddress,
    setMultiSigAddress,
    setAddressOwner,
    setWalletEthBalance,
    _address: address,
  } = useContext(MultiSigAddressContext);
  const walletNameInput = useRef();

  const {
    data: ImportAddress,
    isError: importError,
    isLoading: walletimportLoading,
  } = checkDeployedWalletTx(importName, ProcessTx.importWallet);

  const { data: _isAddressOwner } = checkAddressOwner(multiSigAddress, address);

  const proceedinImport = () => {
    dispatchProcess({ type: "importWallet", state: true });
    setImportName(walletNameInput.current.value);
  };

  useEffect(() => {
    if (ImportAddress != null) {
      if (parseInt(ImportAddress) == 0) {
        dispatchProcess({ type: "importWallet", state: false });
        dispatchButtonUI({ buttonType: "import", buttonState: "failed" });
        setTimeout(
          () =>
            dispatchButtonUI({ buttonType: "import", buttonState: "pending" }),
          3000
        );
      } else {
        setMultiSigAddress(ImportAddress);
        dispatchProcess({ type: "importWallet", state: true });
      }
    }
  }, [ImportAddress]);

  useEffect(() => {
    setAddressOwner(_isAddressOwner);
  }, [_isAddressOwner]);

  const { data: _ethBalance } = useBalance({ address: multiSigAddress });

  useEffect(() => {
    if (_ethBalance != null) {
      setWalletEthBalance(`${formatEther(_ethBalance.value)}`);
    }
  }, [_ethBalance]);

  // For Handling the Import of Accounts Ends here

  const checkAddress = (_addresses) => {
    let addresses_ok = true;
    const dup = {};
    if (_addresses.length == 0) addresses_ok = false;
    for (let i = 0; i < _addresses.length; i++) {
      if (dup[`${_addresses[i]}`] == true) {
        addresses_ok = false;
        break;
      }
      utils.to;
      if (!utils.isAddress(_addresses[i])) {
        addresses_ok = false;
        break; //return Address i is invalid
      }
      dup[`${_addresses[i]}`] = true;
    }
    if (!addresses_ok) {
      dispatchProcess({ type: "addressOk", state: false });
      dispatchProcess({ type: "createWallet", state: false });
    } else dispatchProcess({ type: "addressOk", state: true });
  };
  const adjustOwners = () => {
    setAddressList((initial) => [...initial, ""]);
    dispatchProcess({ type: "addressOk", state: false });
  };

  const removeOwner = (i) => {
    let newAddress = [...addressList];
    newAddress.splice(i, 1);
    setAddressList(newAddress);
    checkAddress(newAddress);
  };

  const handleChangeOwner = (value, i) => {
    const inputAddress = [...addressList];
    inputAddress[i] = value.target.value;
    checkAddress(inputAddress);
    setAddressList(inputAddress);
  };

  const handleValidator = (e) => {
    if (e.target.value <= addressList.length) {
      setNumConfirmation(e.target.value);
    }
  };

  const handleWalletName = (e) => {
    setWalletName(e.target.value);
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (walletName != "")
        dispatchProcess({ type: "checkDeployedWallet", state: true });
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [walletName]);

  const {
    data: walletAddress,
    isError,
    isLoading: walletinfoLoading,
    refetch: refetchMultiSigAddress,
  } = checkDeployedWalletTx(walletName, ProcessTx.checkDeployedWallet);

  useEffect(() => {
    if (!walletinfoLoading && walletAddress) {
      if (parseInt(walletAddress) == 0)
        dispatchProcess({ type: "isNewWalletName", state: true });
      else dispatchProcess({ type: "isNewWalletName", state: false });
    }

    dispatchProcess({ type: "checkDeployedWallet", state: false });
  }, [walletAddress]);

  useEffect(() => {
    if (ProcessTx.addressOk && ProcessTx.isNewWalletName) {
      dispatchProcess({ type: "createWallet", state: true });
    }
  }, [
    walletName,
    numConfirmation,
    addressList,
    ProcessTx.addressOk,
    ProcessTx.isNewWalletName,
  ]);

  const failed = () => {
    dispatchButtonUI({ buttonType: "create", buttonState: "failed" });
    setTimeout(
      () => dispatchButtonUI({ buttonType: "create", buttonState: "pending" }),
      5000
    );
  };

  const { data: TransactionResponse, write } = createWalletTx(
    walletName,
    addressList,
    numConfirmation,
    ProcessTx.createWallet,
    failed
  );

  const handleCreateWallet = () => {
    if (write != null) {
      write();
      dispatchButtonUI({ buttonType: "create", buttonState: "loading" });
      dispatchProcess({ type: "createWallet", state: false });
    }
  };

  useEffect(() => {
    if (TransactionResponse != null) {
      TransactionResponse.wait(1).then((transactionReceipt) => {
        let _address = transactionReceipt.logs[0].topics[2];
        _address = _address.replace(/0{24}/, "");
        // console.log(
        //   `Address is ${_address} and if address${utils.isAddress(_address)}`
        // );
        //setMultiSigAddress(_address);
        dispatchButtonUI({ buttonType: "create", buttonState: "success" });
      });
    }
  }, [TransactionResponse]);

  return (
    <>
      <div
        className={multiSig.main}
        id={multiSigAddress ? multiSig.walletCreated : ""}
      >
        <div className={multiSig.import}>
          <div className={multiSig.title}>Import MultiSig Wallet</div>
          <div className={multiSig.input}>
            <input
              placeholder="Enter MultiSig Wallet Name"
              ref={walletNameInput}
            />
            <Button
              initialText={"Import Wallet"}
              failureText={"Wallet not created"}
              state={buttonUI.import}
              isOk={[address]}
              clickFunction={() => {
                proceedinImport();
              }}
            />
          </div>
        </div>
        <div className={multiSig.divider}></div>
        <div className={multiSig.createWallet}>
          <div className={multiSig.title}>Create MultSig Wallet</div>
          <div className={multiSig.addresses}>
            {addressList.map((address, i) => {
              return (
                <div className={multiSig.owner} key={i}>
                  <input
                    placeholder={`Enter Owner Address ${i + 1}`}
                    value={address}
                    onChange={(e) => handleChangeOwner(e, i)}
                  />
                  <div
                    className={multiSig.cancel}
                    onClick={() => removeOwner(i)}
                  >
                    X
                  </div>
                </div>
              );
            })}
          </div>
          <button onClick={() => adjustOwners()} id={multiSig.owner}>
            Add Owners
          </button>
          <div className={multiSig.validator}>
            <div>Enter the number of Confirmation</div>
            <input
              type="number"
              value={numConfirmation}
              onChange={(e) => handleValidator(e)}
            />
          </div>
          <div className={multiSig.walletName}>
            <div>Enter WalletName</div>
            <input
              placeholder="Enter Wallet name"
              value={walletName}
              onChange={(e) => handleWalletName(e)}
            />
          </div>
          <Button
            initialText={"Proceed in Creating Wallet"}
            failureText={"Wallet Creation Failed"}
            successText={"MultiSig Wallet Successful"}
            state={buttonUI.create}
            clickFunction={() => handleCreateWallet()}
            isOk={[
              ProcessTx.addressOk,
              ProcessTx.isNewWalletName,
              !(numConfirmation < 1),
              address,
              write != null ||
                buttonUI.create == "loading" ||
                buttonUI.create == "success" ||
                buttonUI.create == "failed",
            ]}
          />
        </div>
      </div>
    </>
  );
}

export default MultiSigCreation;
