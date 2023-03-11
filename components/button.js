import buttonstyle from "./Button.module.css";

function Button({
  initialText,
  failureText,
  successText,
  state,
  isOk,
  clickFunction,
}) {
  let displayText = "";
  let stylename = "";
  if (state == "pending") {
    displayText = initialText;
    stylename = buttonstyle.pending;
  }
  if (state == "loading") {
    displayText = "";
    stylename = buttonstyle.loading;
  }
  if (state == "success") {
    displayText = successText;
    stylename = buttonstyle.success;
  }
  if (state == "failed") {
    displayText = failureText;
    stylename = buttonstyle.failure;
  }

  let _isOk = true;
  for (let i = 0; i < isOk.length; i++) {
    _isOk = _isOk && isOk[i];
    if (!_isOk) break;
  }

  return (
    <div className={buttonstyle.main}>
      <button disabled={!_isOk} onClick={clickFunction} className={stylename}>
        {displayText}
      </button>
    </div>
  );
}

export default Button;
