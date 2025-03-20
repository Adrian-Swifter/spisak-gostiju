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
        alignItems: "center",
        gap: "15px",
        padding: "25px",
        border: "1px solid #000",
        borderRadius: "10px",
        boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
        maxWidth: "450px",
        margin: "20px auto",
        backgroundColor: "#fff",
      }}
    >
      <div style={{ position: "relative", width: "100%" }}>
        <FaUser
          style={{
            position: "absolute",
            left: "10px",
            top: "50%",
            transform: "translateY(-50%)",
            color: "#000",
            zIndex: 1,
          }}
        />
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{
            padding: "12px 12px 12px 35px",
            borderRadius: "5px",
            border: "1px solid #000",
            width: "100%",
            boxSizing: "border-box",
            fontSize: "16px",
            position: "relative",
          }}
          placeholder="Unesi ime gosta"
        />
      </div>

      <button
        type="submit"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "12px 10px",
          borderRadius: "5px",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
          border: "1px solid #ccc",
          backgroundColor: "#fff",
          color: "#000",
          cursor: "pointer",
          fontSize: "16px",
          width: "100%",
        }}
      >
        <FaPlus style={{ marginRight: "8px" }} />
        Dodaj Gosta
      </button>
    </form>
  );
};

export default GuestForm;
