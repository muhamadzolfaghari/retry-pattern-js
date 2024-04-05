// A sleep function to introduce delays
const sleep = (timeout) => new Promise(resolve => setTimeout(resolve, timeout));

// Attempt to execute the maximum number of retries before giving up
async function retryAsyncCallback(asyncFn, initialTimeout = 1000, maxRetries = 3) {
	try {
		await sleep(initialTimeout);
		return await asyncFn();
	} catch (error) {
		if (maxRetries > 0) {
			return retryAsyncCallback(asyncFn, initialTimeout * 2, maxRetries - 1);
		} else {
			throw new Error('Maximum number of retries occurred.');
		}
	}
}

// A sample retry with axios GET request
await retryAsyncCallback(() => axios.get("https://path-to-website.com"));

// Another example with a custom async function (e.g., reading from a serial port)
await retryAsyncCallback(() => readSerialPort());

// A retry with changed configuration (longer initial timeout and more retries)
await retryAsyncCallback(() => someAsyncMethod(), 2000, 10);
