import logo from "../assets/logo.png";

const Header = () => {
  return (
    <div
      style={{
        textAlign: "center",
        borderBottom: "1px solid #eee",
      }}
    >
      <img
        src={logo}
        alt="App Logo"
        style={{
          maxWidth: "150px",
          height: "auto",
          margin: "0 auto",
          display: "block",
        }}
      />
    </div>
  );
};

export default Header;
