import logo from "../assets/logo.png";
import { FaHeart } from "react-icons/fa";

const Header = () => {
  return (
    <div
      style={{
        textAlign: "center",
        padding: "10px 0 10px",
        position: "relative",
        zIndex: 1,
        background: "#f5d4e2",
      }}
    >
      <h1
        style={{
          fontFamily: "var(--font-secondary)",
          fontSize: "2.3rem",
          margin: "0",
          color: "#7e3f5e",
          textShadow: "0 2px 4px rgba(255,255,255,0.3)",
        }}
      >
        SpisakGostiju
      </h1>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "rgba(126, 63, 94, 0.5)",
            margin: "8px 8px 0",
          }}
        />
        <FaHeart
          style={{
            color: "#7e3f5e",
            margin: "8px 0 0",
            opacity: 0.8,
            filter: "drop-shadow(0 2px 3px rgba(255,255,255,0.3))",
            animation: "pulse 1.5s infinite",
          }}
          size={12}
        />
        <div
          style={{
            width: "40px",
            height: "2px",
            background: "rgba(126, 63, 94, 0.5)",
            margin: "8px 8px 0",
          }}
        />
      </div>

      <p
        style={{
          fontSize: "0.85rem",
          color: "#7e3f5e",
          opacity: 0.9,
          margin: "8px 0 0",
          fontStyle: "italic",
        }}
      >
        Planiranje proslave
      </p>

      <img
        src={logo}
        alt="App Logo"
        style={{
          maxWidth: "120px",
          height: "auto",
          margin: "15px auto 0",
          display: "block",
          filter:
            "brightness(0) invert(1) drop-shadow(0 2px 5px rgba(0,0,0,0.15))",
        }}
      />

      <style>
        {`
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.2); }
          100% { transform: scale(1); }
        }
        `}
      </style>
    </div>
  );
};

export default Header;
