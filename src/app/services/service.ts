import { Appointment } from '../appointment/appointment';

export interface Service {
    id: number;
    name: string;
    price: number;
    appointment: Appointment; // Relación con Appointment
}
