# time-remaining
A small typescript package that gives an estimate of time as a function of percentage complete. This package has 0 dependencies and should only be around 40-60kb.

## Install
```bash
npm install @franklinharvey/time-remaining
```
```bash
yarn add @franklinharvey/time-remaining
```
or just yank the code from `src/`, its pretty simple.
## Usage
### Class based
```typescript
const timer = new TimeRemaining();
timer.totalIterations = tasks.length;
for (let i = 0; i < tasks.length; i++) {
    timer.currentIteration = i;
    console.log(timer.estimatedEndDate.toLocaleString());
}
```

### Pure Function
```typescript
const startDate = new Date()
for (let i = 0; i < tasks.length; i++) {
    const currentDate = new Date()
    const endDate = timeRemaining(i, tasks.length, startDate, currentDate)
    console.log(`Seconds remaining: ${endDate.getSeconds()}`)
    console.log(`Estimated completion: ${endDate.toLocaleString()}`);
}
```

### How it works
There are no timing functions used such as `setTimeout` or `setInterval`, just some basic math. If you know how many total tasks you have, how many you have completed, and when you started, the estimated total time you will spend is the time you have used (`current` - `start`) divided by the percentage you are done (`totalTasks` / `currentTask`). Check out `src/functions/timeRemaining.ts`.
