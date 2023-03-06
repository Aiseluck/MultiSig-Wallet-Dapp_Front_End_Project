import { useState } from "react";
import auth from "./authorize.module.css";

function Authorize({ view }) {
  const [focus, setFocus] = useState("");

  const toggle = (value) => {
    if (focus == value) setFocus("");
    else setFocus(value);
  };

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
            <input placeholder="Enter Receipent Addresss" />
            <p>Enter Receipent</p>
          </div>
          <div className="value">
            <input placeholder="Amount of Ether to Send" />
            <p>Amount of Ether</p>
          </div>
          <div className="CallData">
            <textarea rows="3" placeholder="CallData" />
            <p>CallData</p>
          </div>
          <button>Proceed in Transaction</button>
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
          <input type="number" placeholder="Enter Transaction Id" />
          <button>Authorize Transaction</button>
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
          <input type="number" placeholder="Enter Transaction Id" />
          <button>Execute Transaction</button>
        </div>
      </div>
    </div>
  );
}

export default Authorize;
