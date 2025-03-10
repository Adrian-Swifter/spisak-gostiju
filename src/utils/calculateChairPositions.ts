import { v4 as uuidv4 } from "uuid";
import { Chair } from "../types";

const calculateChairPositions = (
    type: "rectangle" | "circle",
    count: number,
    width: number,
    height: number,
    existingChairs: Chair[] = []
  ): Chair[] => {
    const chairSize = 20;
    const chairs: Chair[] = [];
    const preservedChairs = existingChairs.slice(0, count); 
  
    if (type === "rectangle") {
      // Front side (left) - 1 chair
      const frontChairs = 1;
      const remaining = Math.max(0, count - frontChairs);
      const perVerticalSide = Math.ceil(remaining / 2);
  
      // Front chair (left side)
      if (frontChairs > 0) {
        chairs.push({
          x: -chairSize,
          y: height / 2 - chairSize / 2,
          side: "front",
        });
      }
  
      // Top and bottom sides
      ["top", "bottom"].forEach((side) => {
        const step = width / (perVerticalSide + 1);
        for (let i = 0; i < perVerticalSide; i++) {
          chairs.push({
            x: step * (i + 1) - chairSize / 2,
            y: side === "top" ? -chairSize : height,
            side: side as "top" | "bottom",
          });
        }
      });
    } else {
      // Circle table logic
      const centerX = width / 2;
      const centerY = height / 2;
      const radius = Math.min(width, height) / 2 - chairSize * 1.5;
  
      for (let i = 0; i < count; i++) {
        const angle = (i * (360 / count) * Math.PI) / 180 - Math.PI / 2;
        chairs.push({
          x: centerX + radius * Math.cos(angle) - chairSize / 2,
          y: centerY + radius * Math.sin(angle) - chairSize / 2,
        });
      }
    }
  
    // Merge existing chairs with new positions
    return preservedChairs
      .map((existingChair, index) => ({
        ...existingChair,
        x: chairs[index]?.x ?? existingChair.x,
        y: chairs[index]?.y ?? existingChair.y,
        id: existingChair.id || uuidv4(),
      }))
      .concat(
        chairs.slice(preservedChairs.length).map((pos) => ({
          id: uuidv4(),
          x: pos.x,
          y: pos.y,
          occupiedBy: undefined,
        }))
      )
      .slice(0, count);
  };

  export default calculateChairPositions