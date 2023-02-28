import body from "@/styles/Body.module.css";
import MultiSig from "./getMultiSig";

function Body() {
  return (
    <>
      <div className={body.main}>
        <MultiSig />
      </div>
    </>
  );
}

export default Body;
