import React, { useRef, useEffect, useState } from "react";
import { FaTrash, FaCopy, FaCircle, FaSquare, FaEdit } from "react-icons/fa";

interface TableContextMenuProps {
  visible: boolean;
  position: { x: number; y: number };
  table: {
    id: string;
    width: number;
    type: "rectangle" | "circle";
    name: string;
  };
  onClose: () => void;
  onSizeChange: (size: number) => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onNameChange: (name: string) => void;
}

const TableContextMenu: React.FC<TableContextMenuProps> = ({
  visible,
  position,
  table,
  onClose,
  onSizeChange,
  onDuplicate,
  onDelete,
  onNameChange,
}) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const [editingName, setEditingName] = useState(false);
  const [newName, setNewName] = useState(table.name);
  const MIN_SIZE = 200;
  const MAX_SIZE = 500;

  useEffect(() => {
    setNewName(table.name);
  }, [table.name, visible]);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (visible) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const tableIcon =
    table.type === "circle" ? (
      <FaCircle size={16} style={{ color: "#0066cc" }} />
    ) : (
      <FaSquare size={16} style={{ color: "#0066cc" }} />
    );

  const handleNameSubmit = () => {
    if (newName.trim()) {
      onNameChange(newName);
    } else {
      setNewName(table.name);
    }
    setEditingName(false);
  };

  const currentSize = table.width;
  const sizePreset =
    currentSize <= 250 ? "Mali" : currentSize <= 350 ? "Srednji" : "Veliki";

  return (
    <div
      ref={menuRef}
      className="table-context-menu"
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        zIndex: 1000,
        background: "white",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
        borderRadius: "5px",
        padding: "15px",
        width: "280px",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ marginBottom: "15px" }}>
        {!editingName ? (
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
            >
              {tableIcon}{" "}
              <span style={{ fontWeight: "bold" }}>{table.name}</span>
            </div>
            <button
              onClick={() => setEditingName(true)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#0066cc",
                padding: "4px",
              }}
            >
              <FaEdit />
            </button>
          </div>
        ) : (
          <div style={{ marginBottom: "10px" }}>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{
                width: "100%",
                padding: "8px",
                borderRadius: "4px",
                border: "1px solid #ccc",
                marginBottom: "5px",
              }}
              autoFocus
              onKeyDown={(e) => {
                if (e.key === "Enter") handleNameSubmit();
                if (e.key === "Escape") {
                  setNewName(table.name);
                  setEditingName(false);
                }
              }}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: "5px",
              }}
            >
              <button
                onClick={() => {
                  setNewName(table.name);
                  setEditingName(false);
                }}
                style={{
                  background: "#f5f5f5",
                  border: "1px solid #ddd",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                  color: "#333333",
                }}
              >
                Otkaži
              </button>
              <button
                onClick={handleNameSubmit}
                style={{
                  background: "#4caf50",
                  color: "#ffffff",
                  border: "1px solid #388e3c",
                  borderRadius: "4px",
                  padding: "4px 8px",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
              >
                Sačuvaj
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Show size control only for circle tables */}
      {table.type === "circle" && (
        <div style={{ marginBottom: "15px" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
            }}
          >
            <span style={{ fontSize: "13px", color: "#666" }}>
              Veličina: {sizePreset}
            </span>
            <span style={{ fontSize: "13px", color: "#666" }}>
              {currentSize}px
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "12px" }}>Mala</span>
            <input
              type="range"
              min={MIN_SIZE}
              max={MAX_SIZE}
              value={currentSize}
              onChange={(e) => onSizeChange(parseInt(e.target.value))}
              style={{ flex: 1 }}
            />
            <span style={{ fontSize: "12px" }}>Velika</span>
          </div>
        </div>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "10px",
          marginTop: table.type === "circle" ? 0 : "15px",
        }}
      >
        <button
          onClick={onDuplicate}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            background: "#f8f8f8",
            border: "1px solid #ddd",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
            flex: 1,
            fontSize: "14px",
            color: "#333",
          }}
        >
          <FaCopy /> Dupliciraj
        </button>
        <button
          onClick={onDelete}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "5px",
            background: "#fff0f0",
            border: "1px solid #ffcccc",
            borderRadius: "4px",
            padding: "8px 12px",
            cursor: "pointer",
            color: "#f44336",
            flex: 1,
            fontSize: "14px",
          }}
        >
          <FaTrash /> Obriši
        </button>
      </div>
    </div>
  );
};

export default TableContextMenu;
