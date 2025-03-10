export interface Guest {
    id: string;
    name: string;
  }
  
  export interface Table {
    id: string;
    name: string;
    type: 'rectangle' | 'circle';
    x: number;
    y: number;
    width: number;
    height: number;
    chairs: Chair[];
    chairsCount: number;
  }
  
  export interface Chair {
    id: string;
    x: number;
    y: number;
    occupiedBy?: string;
    side?: 'front' | 'top' | 'bottom'; // Add side property
  }