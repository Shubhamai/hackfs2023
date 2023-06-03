import Navigation from "./components/header/Navigation";

const Header = () => {
  return (
    <div className="fixed top-3 flex flex-row w-full ">
      <div className="flex flex-row mx-auto items-center justify-between gap-72">
        <p>HackFS 2023</p>
        <Navigation />
        <button>HackFS 2023</button>
      </div>
      <div />
    </div>
  );
};

export default Header;
