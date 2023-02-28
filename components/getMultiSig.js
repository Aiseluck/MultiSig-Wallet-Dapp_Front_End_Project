import multiSig from "@/styles/multiSign.module.css";
import { useState } from "react";

function MultiSig() {
  const [addressList, setAddressList] = useState([""]);

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
          <div className={multiSig.validator}></div>
        </div>
      </div>
    </>
  );
}

export default MultiSig;
