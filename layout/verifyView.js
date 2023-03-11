import verify from "@/styles/Verify.module.css";

function VerifyView() {
  return (
    <>
      <div className={verify.link}>
        <img src="./layer.png" className={verify.img}></img>
        <div className={verify.text}>
          <a
            href="https://sepolia.etherscan.io/address/0x349d9c3aeBf247C0352404E090A5d2C09a7c2e53#code"
            target="_blank"
            rel="noreferrer"
          >
            Click to verify Wallet Factory Contract
          </a>
        </div>
      </div>
    </>
  );
}

export default VerifyView;
