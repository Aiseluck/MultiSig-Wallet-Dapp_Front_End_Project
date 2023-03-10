import footer from "./navBar.module.css";

function NavBar({ page }) {
  const [view, setView] = page;

  const setPageView = (i) => {
    setView(i);
  };

  return (
    <>
      <div className={footer.footer}>
        <div
          id={view === 1 ? footer.grow : "null"}
          onClick={() => setPageView(1)}
        >
          <img src="/left.svg" alt="" />
          <p>Authorization</p>
        </div>
        <div
          className={footer.stake}
          id={view === 2 ? footer.grow : "null"}
          onClick={() => setPageView(2)}
        >
          <img src="/right.svg" alt="" />
          <p>Transactions</p>
        </div>
      </div>
    </>
  );
}

export default NavBar;
