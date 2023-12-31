import {  expect, test  } from "vitest"
import { getFutureDate } from "./getFutureDate"

test('Increases date with one year', () => {
    const year = new Date().getFullYear()

    expect(getFutureDate(`${year}-08-10`).getFullYear()).toEqual(new Date().getFullYear() +1)
});