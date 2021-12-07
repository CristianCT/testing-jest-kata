import { createEvent, createEventList } from './functions';

const weekday = "tue";
const week = 1;
const openHour = 8;
const closeHour = 14;
const startDate = new Date(global.Date.now());

beforeAll(() => { 
    global.Date.now = jest.fn(() => new Date('2021-12-07T20:30:30Z').getTime()) 
});

test('Validation a event title and content basic', () => {
    
    //TODO: hacer las verificaciones
    const result = createEvent(weekday, week, openHour, closeHour);

    expect(result.title).toBe("[SOFKA U] Meeting Room");
    expect(result.description).toBe("Mentoring and Practice");
    expect(result.duration).toEqual([closeHour - openHour, 'hour']);

});

test('Validation start date', () => {
    //TODO: hacer las verificaciones
    const result = createEvent(weekday, week, openHour, closeHour);
    expect(result.start.getDay()).toEqual(startDate.getDay());
    expect(result.start.getMonth()).toEqual(startDate.getMonth());
    expect(result.start.getFullYear()).toEqual(startDate.getFullYear());
});

test('Validation date', () => {
   //TODO: hacer las verificaciones
   const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
   const fecha = new Date(startDate).toLocaleDateString('es-ES', options);

   const result = createEvent(weekday, week, openHour, closeHour);
   expect(result.date).toEqual(fecha);
});


test('Validation illegal arguments', () => {
    //TODO: hacer las verificaciones
    const weekdayError = "tu";
    const weekError = -1;
    const openHourError = 18;
    const closeHour = 14;

    try {
        const result = createEvent(weekday, week, openHourError, closeHour);
    } catch (error) {
        expect(error.toString()).toEqual("Error: Argumento ilegal en el horario de entrada.");
    }

    try {
        const result = createEvent(weekday, weekError, openHour, closeHour);
    } catch (error) {
        expect(error.toString()).toEqual("Error: Argumento ilegal para la semana, debe ser un valor positivo.");
    }

    try {
        const result = createEvent(weekdayError, week, openHour, closeHour);
    } catch (error) {
        expect(error.toString()).toEqual("Error: Argumento ilegal el dia de la semana, valores posibles; 'mon', 'tue', 'wed', 'thu', 'fri', 'sat' y 'sun'.");
    }
});


test('Create an event list of at least 10 events', () => {
    //TODO: hacer las verificaciones
    const result = createEventList(weekday, week, openHour, closeHour, 0, []);
    expect(result.length).toBe(10);
});