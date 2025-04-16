import { useState } from "react";
import { FaUser, FaPlus } from "react-icons/fa";

const GuestForm = ({ onAdd }: { onAdd: (name: string) => void }) => {
  const [name, setName] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        onAdd(name);
        setName("");
      }}
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "15px",
        marginTop: "10px",
        borderRadius: "var(--radius-lg)",
        boxShadow: "var(--shadow-md)",
        maxWidth: "450px",
        margin: "0 auto 20px",
        backgroundColor: "white",
        border: "1px solid var(--primary-light)",
      }}
    >
      <h3
        style={{
          margin: "0 0 10px",
          color: "var(--primary-dark)",
          fontFamily: "var(--font-secondary)",
          fontSize: "1.8rem",
        }}
      >
        Dodaj Gosta
      </h3>

      <div style={{ position: "relative", width: "100%" }}>
        <FaUser
          style={{
            position: "absolute",
            left: "15px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "var(--primary-color)",
            zIndex: 1,
          }}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px 12px 12px 40px",
            border: "1px solid var(--accent)",
            borderRadius: "var(--radius-md)",
            width: "100%",
            boxSizing: "border-box",
            fontSize: "16px",
            position: "relative",
            transition: "all 0.2s ease",
          }}
          placeholder="Unesi ime gosta"
        />
      </div>

      <button
        type="submit"
        className="btn-primary"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 10px",
          borderRadius: "var(--radius-md)",
          border: "none",
          backgroundColor: "rgb(126, 63, 94)",
          color: "#ffffff",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
          transition: "all 0.2s ease",
          fontWeight: "500",
        }}
      >
        <FaPlus style={{ marginRight: "8px" }} />
        Dodaj Gosta
      </button>
    </form>
  );
};

export default GuestForm;
