import React, { useState, useEffect } from "react";
import { FaTimes, FaDesktop, FaMouse, FaChair } from "react-icons/fa";

interface MobileWelcomePopupProps {
  onClose: () => void;
}

const MobileWelcomePopup: React.FC<MobileWelcomePopupProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    localStorage.setItem("mobileWelcomeShown", "true");
    setTimeout(() => {
      onClose();
    }, 300); // Animation duration
  };

  return (
    <div
      className={`mobile-welcome-popup ${isClosing ? "closing" : ""}`}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.85)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        transition: "opacity 0.3s ease",
        opacity: isClosing ? 0 : 1,
      }}
    >
      <div
        className="popup-content"
        style={{
          backgroundColor: "#fff",
          borderRadius: "12px",
          padding: "20px",
          width: "90%",
          maxWidth: "500px",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)",
          position: "relative",
        }}
      >
        <button
          onClick={handleClose}
          style={{
            position: "absolute",
            top: "15px",
            right: "15px",
            background: "none",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            color: "#666",
            zIndex: 5,
          }}
        >
          <FaTimes />
        </button>

        <h2
          style={{
            fontSize: "22px",
            textAlign: "center",
            color: "var(--primary-dark)",
            marginBottom: "15px",
          }}
        >
          Dobrodošli u mobilnu verziju
        </h2>

        <div
          className="video-container"
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%", // 16:9 aspect ratio
            marginBottom: "20px",
            borderRadius: "8px",
            overflow: "hidden",
            backgroundColor: "#000",
          }}
        >
          <video
            autoPlay
            muted
            loop
            playsInline
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          >
            <source src="/assets/videos/desktop-demo.mp4" type="video/mp4" />
            Vaš pretraživač ne podržava video tag.
          </video>
        </div>

        <div
          style={{
            fontSize: "16px",
            lineHeight: "1.5",
            color: "#333",
            marginBottom: "20px",
          }}
        >
          <p style={{ marginBottom: "15px" }}>
            <strong>Mobilna verzija ima ograničene funkcionalnosti.</strong> Za
            puno iskustvo, koristite desktop verziju koja uključuje:
          </p>

          <ul
            style={{
              paddingLeft: "25px",
              marginBottom: "15px",
              listStyleType: "none",
            }}
          >
            <li
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                <FaDesktop />
              </span>
              <span>Vizuelni raspored stolova sa drag-and-drop funkcijom</span>
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                <FaMouse />
              </span>
              <span>Precizno postavljanje stolova i gostiju</span>
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: "10px",
              }}
            >
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "30px",
                  height: "30px",
                  borderRadius: "50%",
                  backgroundColor: "var(--primary-color)",
                  color: "#fff",
                  marginRight: "10px",
                }}
              >
                <FaChair />
              </span>
              <span>Napredno upravljanje rasporedom sedenja</span>
            </li>
          </ul>
        </div>

        <button
          onClick={handleClose}
          style={{
            display: "block",
            width: "100%",
            padding: "12px 0",
            backgroundColor: "var(--primary-color)",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontSize: "16px",
            fontWeight: "bold",
            cursor: "pointer",
            transition: "background-color 0.2s ease",
          }}
        >
          Razumem
        </button>
      </div>
    </div>
  );
};

export default MobileWelcomePopup;
