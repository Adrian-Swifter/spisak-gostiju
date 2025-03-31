import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        zIndex: 1,
      }}
    >
      <img
        src={logo}
        alt="App Logo"
        style={{
          maxWidth: "150px",
          height: "auto",
          margin: "auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Header;
