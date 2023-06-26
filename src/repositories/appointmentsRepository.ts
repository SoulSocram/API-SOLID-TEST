import { Appointment } from "../entities/appointment"

export interface AppointmentRepository {
    create(appointment: Appointment): Promise<void>
    findOverlapingAppointment(startsAt: Date, endsAt: Date): Promise<Appointment | null>
}