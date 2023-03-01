import multiSig from "@/styles/multiSign.module.css";
import { useState } from "react";
import { utils } from "ethers";
import createWalletTx from "@/utils/createWalletTransaction";
import checkDeployedWalletTx from "@/utils/deployedWalletTransaction";

function MultiSig() {
  const [addressList, setAddressList] = useState([""]);
  const [numConfirmation, setNumConfirmation] = useState(1);
  const [walletName, setWalletName] = useState("");
  const [addressOk, setAdressOk] = useState(false);

  console.log(addressList);

  const checkAddress = (_addresses) => {
    let addresses_ok = true;
    for (let i = 0; i < _addresses.length; i++) {
      if (!utils.isAddress(_addresses[i])) {
        addresses_ok = false;
        break; //return Address i is invalid
      }
    }
    if (!addresses_ok) setAdressOk(false);
    else setAdressOk(true);
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
              placeholder="Enter Wallet name, this would be imoortant fro wallet recovery"
              value={walletName}
              onChange={(e) => handleWalletName(e)}
            />
          </div>
          <button
            onClick={() => console.log("I am clicked")}
            disabled={!addressOk || numConfirmation < 1}
          >
            Proceed in Creating Wallet
          </button>
        </div>
      </div>
    </>
  );
}

export default MultiSig;
