/**
 *  A pure function for calculating when a task should finish
 *
 * @param {number} currentCount which iteration, k for k/n operations
 * @param {number} totalCount total iterations, n for k/n operations
 * @param {number} start the time the operation started, if a number it is assumed to be ms or Date().valueOf()
 * @return {*} the remaining time in millisconds
 * @example
 *
 * ```
 * const startDate = new Date()
 * for (let i = 0; i < tasks.length; i++) {
 * 		const currentDate = new Date()
 * 		const endDate = timeRemaining(i, tasks.length, startDate, currentDate)
 * 		console.log(`Seconds remaining: ${endDate.getSeconds()}`)
 *		console.log(`Estimated completion: ${endDate.toLocaleString()}`);
 * }
 * ```
 */
export default function timeRemaining(
	cuurentIteration: number,
	totalIterations: number,
	startDate: Date | number,
	currentDate: Date | number,
): Date {
	const perc = cuurentIteration / totalIterations;
	const used = currentDate.valueOf() - startDate.valueOf();
	const totalTimeWillSpend = used / perc;
	const timeRemain = totalTimeWillSpend - used;
	return new Date(currentDate.valueOf() + timeRemain);
}
