import { Appointment } from "../entities/appointment";
import { AppointmentRepository } from "../repositories/appointmentsRepository";

interface CreateAppointmentReq {
  customer: string;
  startsAt: Date;
  endsAt: Date;
}

type CreateAppointmentRes = Appointment;

export class CreateAppointment {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    customer,
    startsAt,
    endsAt,
  }: CreateAppointmentReq): Promise<CreateAppointmentRes> {
    const overlappingAppointment =
      await this.appointmentRepository.findOverlapingAppointment(
        startsAt,
        endsAt
      );

    if (overlappingAppointment) {
      throw new Error("Another appointment overlaps this appointment dates");
    }

    const appointment = new Appointment({
      customer,
      startsAt,
      endsAt,
    });

    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
