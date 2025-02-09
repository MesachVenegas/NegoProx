import { AppointmentStatus } from '../enums/appointment_status.enum';

export class Appointment {
  public readonly id: string;
  public readonly date: Date;
  private _status: AppointmentStatus;
  public readonly clientId: string;
  public readonly serviceId: string;
  public readonly createdAt: Date;
  public updatedAt: Date;
  public cancelledAt: Date | null;
  constructor(
    id: string,
    date: Date,
    status: AppointmentStatus,
    clientId: string,
    serviceId: string,
    createdAt: Date = new Date(),
    updatedAt: Date = new Date(),
    cancelledAt: Date | null = null,
  ) {
    this.id = id;
    this.date = date;
    this._status = status;
    this.clientId = clientId;
    this.serviceId = serviceId;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.cancelledAt = cancelledAt;
  }

  private validate(date: Date, status: AppointmentStatus): void {
    if (date < new Date()) {
      throw new Error('No es posible agendar una cita en el pasado');
    }
    if (!Object.values(AppointmentStatus).includes(status)) {
      throw new Error('Estatus de cita no válido');
    }
  }

  /**
   * Confirms the appointment by setting its status to CONFIRMED.
   * Throws an error if the appointment is not currently in a PENDING status.
   * Updates the updatedAt timestamp to the current date and time.
   */
  public confirm(): void {
    if (this._status !== AppointmentStatus.PENDING) {
      throw new Error(
        'Solo se pueden confirmar citas pendientes o la cita ya fue confirmada',
      );
    }
    this._status = AppointmentStatus.CONFIRMED;
    this.updatedAt = new Date();
  }

  /**
   * Cancels the appointment by setting its status to CANCELLED.
   * Throws an error if the appointment is already cancelled.
   * Throws an error if the appointment is less than 24 hours away.
   * Updates the updatedAt and cancelledAt timestamps to the current date and time.
   */
  public cancel(): void {
    if (this._status === AppointmentStatus.CANCELLED) {
      throw new Error('La cita ya fue cancelada');
    }

    const now = new Date();
    const hoursUntilAppointment = Math.abs(
      now.getTime() - this.date.getTime() / 1000 / 60 / 60,
    );
    if (hoursUntilAppointment < 24) {
      throw new Error(
        'No se pueden cancelar citas con menos de 24 horas de anticipación',
      );
    }

    this._status = AppointmentStatus.CANCELLED;
    this.updatedAt = new Date();
    this.cancelledAt = new Date();
  }
  get status(): AppointmentStatus {
    return this._status;
  }

  public toJSON() {
    return {
      id: this.id,
      date: this.date.toISOString(),
      status: this.status,
      clientId: this.clientId,
      serviceId: this.serviceId,
      createdAt: this.createdAt.toISOString(),
      updatedAt: this.updatedAt.toISOString(),
      cancelledAt: this.cancelledAt?.toISOString(),
    };
  }
}
