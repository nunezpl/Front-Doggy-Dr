import { Treatment } from '../treatment/treatment'; // Asegúrate de que la ruta sea correcta

export interface Medicine {
    id: number;
    name: string;
    availableUnits: number;
    soldUnits: number;
    cost: number;
    salesPrice: number;
    treatments: Treatment[]; // Relación con Treatment
}
