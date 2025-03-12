import { v4 as uuidv4 } from "uuid";
import { Chair } from "../types";

const calculateChairPositions = (
  type: 'rectangle' | 'circle',
  count: number,
  width: number,
  height: number,
  existingChairs: Chair[] = [],
  seatingType?: 'one-sided' | 'two-sided' 
): Chair[] => {
  const chairs: Chair[] = [];
  const preservedChairs = existingChairs.slice(0, count);
  const chairSize = 20;
  const chairSpacing = 5; 

  if (type === 'rectangle') {
    const sides = seatingType === 'one-sided' ? ['top'] : ['top', 'bottom'];
    const chairsPerSide = Math.ceil(count / sides.length);
    
    sides.forEach(side => {
      for (let i = 0; i < chairsPerSide; i++) {
        const x = (width / (chairsPerSide + 1)) * (i + 1) - chairSize/2;
        const y = side === 'top' ? -chairSize : height;
        
        if (chairs.length < count) {
          chairs.push({ x, y, side });
        }
      }
    });
  }else {
    // Improved circle calculations
    const diameter = Math.min(width, height);
    const radius = (diameter / 2) - chairSize - 10; 
    const centerX = width / 2;
    const centerY = height / 2;
    const angleStep = (2 * Math.PI) / count; 

    for (let i = 0; i < count; i++) {
      const angle = (i * angleStep) - Math.PI / 2; 
      const x = centerX + radius * Math.cos(angle) - chairSize / 2;
      const y = centerY + radius * Math.sin(angle) - chairSize / 2;
      
      chairs.push({
        x,
        y,
        angle: (angle * 180) / Math.PI 
      });
    }
  }
  
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

export default calculateChairPositions;