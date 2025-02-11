import { Appointment } from '@/core/domain/entities';

export interface AppointmentServiceInterface {
  save(appointment: Appointment): Promise<Appointment>;
  confirm(id: string): Promise<void>;
  cancel(id: string): Promise<void>;
  findById(id: string): Promise<Appointment[] | null>;
  findAll(): Promise<Appointment[] | null>;
}
