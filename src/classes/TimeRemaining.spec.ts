import TimeRemaining from './TimeRemaining';

describe('TimeRemaining class', () => {
	let dayBefore = new Date('2020-01-01T00:00:00.000Z');
	let dayAfter = new Date('2020-01-03sT00:00:00.000Z');
	let mockDate = new Date('2020-01-02T00:00:00.000Z');
	let spy = jest
		.spyOn(global, 'Date')
		.mockImplementation(() => (mockDate as unknown) as string);

	let timer = new TimeRemaining();

	beforeEach(() => {
		timer = new TimeRemaining();
	});

	afterAll(() => {
		spy.mockRestore();
	});

	it('is defined', () => {
		expect(timer).toBeDefined();
	});
	it('has a start date by default', () => {
		expect(timer.startDate).toEqual(
			new Date('2020-01-02T00:00:00.000Z').valueOf(),
		);
	});

	it('resets the date correctly with no arg', () => {
		const newTimer = new TimeRemaining();
		newTimer.resetStart();
		expect(newTimer.startDate).toEqual(new Date().valueOf());
	});

	it('resets the date correctly with a number arg', () => {
		const newTimer = new TimeRemaining();

		newTimer.resetStart(dayBefore.valueOf());
		expect(newTimer.startDate).toEqual(dayBefore.valueOf());
		expect(newTimer.startDate === new Date().valueOf()).toBeFalsy();
	});

	it('resets the date correctly with a date arg', () => {
		const newTimer = new TimeRemaining();

		newTimer.resetStart(dayBefore);
		expect(newTimer.startDate).toEqual(dayBefore.valueOf());
	});

	it('has a default total iterations', () => {
		expect(timer.totalIterations).toBeDefined();
		expect(timer.totalIterations).toEqual(0);
	});

	it('can set total iterations', () => {
		timer.totalIterations = 1;
		expect(timer.totalIterations).toEqual(1);
	});

	it('has a default current iterations', () => {
		expect(timer.currentIteration).toBeDefined();
		expect(timer.currentIteration).toEqual(0);
	});

	it('can set current iterations', () => {
		timer.currentIteration = 1;
		expect(timer.currentIteration).toEqual(1);
	});

	it('correctly derives percentage to default 0', () => {
		expect(timer.percentageDone).toEqual(0);
	});

	it('correctly derives percentage', () => {
		timer.totalIterations = 3;
		timer.currentIteration = 1;
		expect(timer.percentageDone).toBeCloseTo(0.33);
	});

	it('correctly computes time spent', () => {
		timer.resetStart(dayBefore);
		expect(timer.timeSpent).toEqual({
			milliseconds: 86400000,
			seconds: 86400,
			minutes: 1440,
			hours: 24,
		});
	});

	it('correctly computes total task time', () => {
		timer.resetStart(dayBefore);
		timer.currentIteration = 1;
		timer.totalIterations = 2;
		expect(timer.totalTaskTime.hours).toEqual(48);
	});

	it('correctly computes time remaining', () => {
		timer.resetStart(dayBefore);
		timer.currentIteration = 1;
		timer.totalIterations = 2;
		expect(timer.timeRemaining.hours).toEqual(24);
	});

	it('correctly computes end date', () => {
		timer.resetStart(dayBefore);
		timer.currentIteration = 1;
		timer.totalIterations = 2;
		expect(timer.estimatedEndDate.valueOf).toEqual(dayAfter.valueOf);
	});
});
