export interface Guest {
    id: string;
    name: string;
  }
  
  export interface Table {
    id: string;
    name: string;
    type: 'rectangle' | 'circle';
    seatingType?: 'one-sided' | 'two-sided'; 
    x: number;
    y: number;
    width: number;
    height: number;
    chairsCount: number;
    chairs: Chair[];
  }
  
  export interface Chair {
    id: string;
    x: number;
    y: number;
    occupiedBy?: string;
    side?: 'front' | 'top' | 'bottom'; // Add side property
  }

  export interface TableComponentProps {
    table: Table;
    guests: Guest[];
    onChairDrop: (chairId: string, guestId: string) => void;
    setTables: React.Dispatch<React.SetStateAction<Table[]>>;
    calculateChairPositions: (
      type: "rectangle" | "circle",
      count: number,
      width: number,
      height: number
    ) => Chair[];
  }