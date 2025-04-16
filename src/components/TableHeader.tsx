import { Table } from "../types";
import React from "react";
import InfoIcon from "../assets/info.png";

interface TableHeaderProps {
  table: Table;
  onNameChange: (name: string) => void;
  onChairCountChange: (delta: number) => void;
}

const TableHeader: React.FC<TableHeaderProps> = ({
  table,
  onNameChange,
  onChairCountChange,
}) => {
  return (
    <div className="table-header">
      <input
        type="text"
        value={table.name}
        onChange={(e) => onNameChange(e.target.value)}
        className="table-name-input"
        onClick={(e) => e.stopPropagation()}
      />
      <div className="chair-controls">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChairCountChange(-1);
          }}
        >
          -
        </button>
        <span>
          {table.chairs.length}{" "}
          {table.chairs.length % 10 === 1 && table.chairs.length % 100 !== 11
            ? "mesto"
            : "mesta"}
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onChairCountChange(1);
          }}
        >
          +
        </button>
      </div>
      <p
        style={{
          fontSize: "0.7rem",
          display: "flex",
          alignItems: "center",
          gap: "5px",
        }}
      >
        <img src={InfoIcon} alt="" style={{ width: "1rem" }} /> Desni klik na
        sto za više opcija.
      </p>
    </div>
  );
};

export default TableHeader;
