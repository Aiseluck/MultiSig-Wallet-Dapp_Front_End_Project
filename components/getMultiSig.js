import multiSig from "@/styles/multiSign.module.css";
import { useEffect, useState } from "react";
import { utils } from "ethers";
import createWalletTx from "@/utils/createWalletTransaction";
import checkDeployedWalletTx from "@/utils/deployedWalletTransaction";

function MultiSig() {
  const [addressList, setAddressList] = useState([""]);
  const [numConfirmation, setNumConfirmation] = useState(1);
  const [walletName, setWalletName] = useState("");
  const [addressOk, setAdressOk] = useState(false);
  const [processTx, setProcessTx] = useState(false);
  const [isNewWalletName, setisNewWalletName] = useState(false);
  const [createMultiSigTx, setCreateMultiSigTx] = useState(false);

  const checkAddress = (_addresses) => {
    let addresses_ok = true;
    const dup = {};
    if (_addresses.length == 0) addresses_ok = false;
    for (let i = 0; i < _addresses.length; i++) {
      if (dup[`${_addresses[i]}`] == true) {
        console.log("Duplicate Exist");
        addresses_ok = false;
        break;
      }
      if (!utils.isAddress(_addresses[i])) {
        addresses_ok = false;
        break; //return Address i is invalid
      }
      dup[`${_addresses[i]}`] = true;
    }
    if (!addresses_ok) {
      setAdressOk(false);
      setCreateMultiSigTx(false);
    } else setAdressOk(true);
  };
  const adjustOwners = () => {
    setAddressList((initial) => [...initial, ""]);
    setAdressOk(false);
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
      console.log("Aisosa is Happy");
      if (walletName != "") setProcessTx(true);
    }, 700);
    return () => clearTimeout(timeoutId);
  }, [walletName]);

  const {
    data: walletAddress,
    isError,
    isLoading: walletinfoLoading,
  } = checkDeployedWalletTx(walletName, processTx);

  useEffect(() => {
    if (!walletinfoLoading && walletAddress) {
      if (parseInt(walletAddress) == 0) setisNewWalletName(true);
      else setisNewWalletName(false);
    }

    setProcessTx(false);
  }, [walletAddress]);

  useEffect(() => {
    if (addressOk && isNewWalletName) {
      setCreateMultiSigTx(true);
      console.log("Calling setCreateMultiSig Tx to true");
    }
    console.log("Hey ia m running inside the Tester");
  }, [walletName, numConfirmation, addressList, addressOk, isNewWalletName]);

  const failed = () => {
    console.log("Hey, the Transaction failed");
  };

  const { data: TransactionResponse, write } = createWalletTx(
    walletName,
    addressList,
    numConfirmation,
    createMultiSigTx,
    failed
  );

  const handleCreateWallet = () => {
    console.log("Wallet Addresses is", addressList);
    console.log("Number of Confirmation is", numConfirmation);
    console.log("Wallet Name is ", walletName);
    write();
    setisNewWalletName(false);
    setCreateMultiSigTx(false);
  };

  useEffect(() => {
    console.log("Printing Transaction Response");
    console.log(TransactionResponse);
    if (TransactionResponse != null) {
      TransactionResponse.wait(1).then((transactionReceipt) => {
        console.log("Printing the Transaction Receipt");
        console.log(transactionReceipt);
      });
    }
  }, [TransactionResponse]);

  return (
    <>
      <div className={multiSig.main}>
        <div className={multiSig.import}>
          <div className={multiSig.tite}>Import MultiSig Wallet</div>
          <div className={multiSig.input}>
            <input placeholder="Enter MultiSig ID or Address" />
            <div>
              <button>Import Wallet</button>
            </div>
          </div>
        </div>
        <div className={multiSig.divider}></div>
        <div className={multiSig.createWallet}>
          <div className={multiSig.tite}>Create MultSig Wallet</div>
          <div className={multiSig.addresses}>
            {addressList.map((address, i) => {
              return (
                <div className={multiSig.owner} key={i}>
                  <input
                    placeholder={`Enter Owner Address ${i + 1}`}
                    value={address}
                    onChange={(e) => handleChangeOwner(e, i)}
                  />
                  <div onClick={() => removeOwner(i)}>X</div>
                </div>
              );
            })}
          </div>
          <button onClick={() => adjustOwners()}>Add Owners</button>
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
              placeholder="Enter Wallet name, this would be imoortant for wallet recovery"
              value={walletName}
              onChange={(e) => handleWalletName(e)}
            />
          </div>
          <button
            onClick={() => handleCreateWallet()}
            disabled={!addressOk || numConfirmation < 1 || !isNewWalletName}
          >
            Proceed in Creating Wallet
          </button>
        </div>
      </div>
    </>
  );
}

export default MultiSig;
