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
    >
      <input value={name} onChange={(e) => setName(e.target.value)} required />
      <button type="submit">Add Guest</button>
    </form>
  );
};

export default GuestForm;
