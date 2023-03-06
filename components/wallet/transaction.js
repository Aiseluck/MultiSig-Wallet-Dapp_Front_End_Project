import transact from "./transaction.module.css";

function Transaction({ view }) {
  return <div id={view == 2 ? "" : transact.notActive}>Transaction Page</div>;
}

export default Transaction;
