import { describe, expect, it } from "vitest"
import { Appointment } from "../entities/appointment"
import { IMAppointmentsRepository } from "../repositories/inMemory/imAppointmentsRepository";
import { getFutureDate } from "../tests/utils/getFutureDate"
import { CreateAppointment } from "./createAppointment"

describe('Create Appointment', () => {
    it('Should be able to create an Appointment', () => {

        const date = new Date()
        const startsAt = getFutureDate(date.toISOString().slice(0, 10))
        
        date.setDate(date.getDate() +1)
        const endsAt = getFutureDate(date.toISOString().slice(0, 10))

        const appointmentRepository = new IMAppointmentsRepository()
        const createAppointment = new CreateAppointment(
            appointmentRepository
        )

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })).resolves.toBeInstanceOf(Appointment)
    })

    it('Should not be able to create an Appointment with overlapping dates', async () => {

        const year = new Date().getFullYear()

        const startsAt = getFutureDate(`${year}-10-10`)
        
        const endsAt = getFutureDate(`${year}-10-15`)

        const appointmentRepository = new IMAppointmentsRepository()
        const createAppointment = new CreateAppointment(
            appointmentRepository
        )
        
        await createAppointment.execute({
            customer: 'John Doe',
            startsAt,
            endsAt
        })

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate(`${year}-10-14`),
            endsAt: getFutureDate(`${year}-10-18`)
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate(`${year}-10-05`),
            endsAt: getFutureDate(`${year}-10-12`)
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate(`${year}-10-05`),
            endsAt: getFutureDate(`${year}-10-17`)
        })).rejects.toBeInstanceOf(Error)

        expect(createAppointment.execute({
            customer: 'John Doe',
            startsAt: getFutureDate(`${year}-10-11`),
            endsAt: getFutureDate(`${year}-10-12`)
        })).rejects.toBeInstanceOf(Error)
    })
})