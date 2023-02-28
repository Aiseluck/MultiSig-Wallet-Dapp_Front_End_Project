import multiSig from "@/styles/multiSign.module.css";
import { useState } from "react";
import { utils } from "ethers";

function MultiSig() {
  const [addressList, setAddressList] = useState([""]);
  const [numConfirmation, setNumConfirmation] = useState(0);
  const [walletName, setWalletName] = useState("");

  console.log(addressList);

  const adjustOwners = () => {
    setAddressList((initial) => [...initial, ""]);
  };

  const removeOwner = (i) => {
    let newAddress = [...addressList];
    newAddress.splice(i, 1);
    setAddressList(newAddress);
  };

  const handleChangeOwner = (value, i) => {
    const inputAddress = [...addressList];
    inputAddress[i] = value.target.value;
    setAddressList(inputAddress);
  };

  const handleValidator = (e) => {
    setNumConfirmation(e.target.value);
  };

  const handleWalletName = (e) => {
    setWalletName(e.target.value);
  };

  const handleCreateWallet = () => {
    let sus = true;
    for (let i = 0; i < addressList.length; i++) {
      if (!utils.isAddress(addressList[i])) {
        sus = false;
        break; //return Address i is invalid
      }
    }

    console.log("Output of Address is", sus);
    console.log("Number of Validation is ", numConfirmation);
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
              placeholder="Enter number of Confirmations Required"
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
          <button onClick={() => handleCreateWallet()}>
            Proceed in Creating Wallet
          </button>
        </div>
      </div>
    </>
  );
}

export default MultiSig;
