import {  expect, test  } from 'vitest'
import { getFutureDate } from '../tests/utils/getFutureDate'
import { Appointment } from './appointment'

test('Create and appointment', () => {
    const date = new Date()
    const startsAt = getFutureDate(date.toISOString().slice(0, 10))
    
    date.setDate(date.getDate() +1)
    const endsAt = getFutureDate(date.toISOString().slice(0, 10))

    const appointment = new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
    });

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toEqual('John Doe')
});

test('Cant create an appointment with end date before start date', () => {
    const date = new Date()
    const startsAt = getFutureDate(date.toISOString().slice(0, 10))
    
    date.setDate(date.getDate() -1)
    const endsAt = getFutureDate(date.toISOString().slice(0, 10))

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        })
    }).toThrow()
});

test('Cant create an appointment with start date before now', () => {
    const startsAt = new Date()
    const endsAt = new Date()

    startsAt.setDate(startsAt.getDate() -1)
    endsAt.setDate(endsAt.getDate() +2)

    expect(() => {
        return new Appointment({
            customer: 'John Doe',
            startsAt,
            endsAt
        })
    }).toThrow()
});