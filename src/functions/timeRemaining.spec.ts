import timeRemaining from './timeRemaining';

describe('timeRemaining function', () => {
	let dayBefore = new Date('2020-01-01T00:00:00.000Z');
	let dayAfter = new Date('2020-01-03T00:00:00.000Z');
	let mockDate = new Date('2020-01-02T00:00:00.000Z');

	it('correctly compute time remaining with number input', () => {
		const tr = timeRemaining(1, 2, dayBefore.valueOf(), mockDate.valueOf());

		expect(tr.valueOf()).toEqual(dayAfter.valueOf());
	});

	it('correctly compute time remaining with date input', () => {
		const tr = timeRemaining(1, 2, dayBefore, mockDate);

		expect(tr.toISOString()).toEqual(dayAfter.toISOString());
	});
});
