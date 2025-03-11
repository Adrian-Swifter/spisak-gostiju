import { useState } from "react";

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
        gap: "10px",
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "400px",
        margin: "0 auto",
        backgroundColor: "#f9f9f9",
      }}
    >
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{
          padding: "10px",
          borderRadius: "4px",
          border: "1px solid #ccc",
          width: "100%",
          boxSizing: "border-box",
        }}
        placeholder="Enter guest name"
      />
      <button
        type="submit"
        style={{
          padding: "10px 20px",
          borderRadius: "4px",
          border: "none",
          backgroundColor: "#007bff",
          color: "#fff",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Add Guest
      </button>
    </form>
  );
};

export default GuestForm;
