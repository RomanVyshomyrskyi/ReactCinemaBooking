import React from "react";

const SeatGrid = ({ seats, onSelect, selected, getStatus }) => {
  return (
    <div
      className="d-flex flex-column align-items-center gap-2"
      style={{ fontFamily: "Grenze, serif", backgroundColor: "#0d1b2a", padding: "1rem" }}
    >
      {seats.map((row, rowIndex) => (
        <div key={rowIndex} className="d-flex gap-2">
          {row.map((_, colIndex) => {
            const isSelected = selected?.some(
              (s) => s.row === rowIndex && s.column === colIndex
            );
            const status = getStatus ? getStatus(rowIndex, colIndex) : "free";

            let bgColor = "#0d1b2a";
            let textColor = "#fff";
            if (isSelected) bgColor = "#28a745"; // green
            else if (status === "mine") {bgColor = "#0dcaf0"; textColor = "#181818"} // cyan
            else if (status === "taken") bgColor = "#6c757d"; // gray
            else bgColor = "transparent";

            return (
              <div
                key={colIndex}
                onClick={() => status !== "taken" && onSelect(rowIndex, colIndex)}
                style={{
                  width: "2rem",
                  height: "2rem",
                  borderRadius: "0.5rem",
                  border: "1px solid #BE3144",
                  backgroundColor: bgColor,
                  color: textColor,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: status === "taken" ? "not-allowed" : "pointer",
                  fontSize: "0.75rem",
                  transition: "all 0.2s ease",
                }}
              >
                {rowIndex + 1}-{colIndex + 1}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};


export default SeatGrid;