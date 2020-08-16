interface TimeDurations {
	milliseconds: number;
	seconds: number;
	minutes: number;
	hours: number;
}

/**
 * * A unified way to keep track of time remaining. This does not use any setTimeouts or other timing function.
 *
 * @class TimeRemaining
 * @example
 *
 * ```
 * const timer = new TimeRemaining();
 * timer.totalIterations = tasks.length;
 * for (let i = 0; i < tasks.length; i++) {
 *		timer.currentIteration = i;
 *		console.log(timer.estimatedEndDate.toLocaleString());
 * }
 * ```
 */
export default class TimeRemaining {
	constructor() {
		this._startDate = new Date().valueOf();
		this._totalIterations = 0;
		this._currentIteration = 0;
	}
	private _startDate: number;
	public get startDate(): number {
		return this._startDate;
	}
	public resetStart(date?: number | Date) {
		this._startDate = date?.valueOf() || new Date().valueOf();
	}

	private _totalIterations: number;
	public get totalIterations() {
		return this._totalIterations;
	}
	public set totalIterations(totalIterations: number) {
		this._totalIterations = totalIterations;
	}

	private _currentIteration: number;
	public get currentIteration() {
		return this._currentIteration;
	}
	public set currentIteration(current: number) {
		this._currentIteration = current;
	}

	public get percentageDone() {
		return this.totalIterations
			? this.currentIteration / this.totalIterations
			: 0;
	}

	/**
	 * The amount of time this task has been running, in milliseconds
	 *
	 * @readonly
	 * @memberof TimeRemaining
	 */
	public get timeSpent(): TimeDurations {
		const timeSpent = new Date().valueOf() - this.startDate;
		return TimeRemaining.msToObject(timeSpent);
	}

	static msToObject(ms: number): TimeDurations {
		return {
			milliseconds: ms,
			seconds: ms / 1000,
			minutes: ms / (1000 * 60),
			hours: ms / (1000 * 60 * 60),
		};
	}

	/**
	 * The total amount of time this task should take. For instance if this task is 25% and it has taken 10 seconds, this will be 40 seconds
	 *
	 * @readonly
	 * @memberof TimeRemaining
	 */
	public get totalTaskTime(): TimeDurations {
		return TimeRemaining.msToObject(
			this.timeSpent.milliseconds / this.percentageDone,
		);
	}

	public get timeRemaining(): TimeDurations {
		const timeRemain =
			this.totalTaskTime.milliseconds - this.timeSpent.milliseconds;
		return TimeRemaining.msToObject(timeRemain);
	}

	public get estimatedEndDate() {
		return new Date(new Date().valueOf() + this.timeRemaining.milliseconds);
	}
}
