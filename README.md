# Retry Pattern in JavaScript


🔁 The retry pattern is a common technique used in asynchronous programming to handle transient failures or errors. 


⏲ It allows you to retry an operation (such as making an API call or reading from a serial port) a specified number of times, with increasing delays between retries. 



👩‍🔧 The goal is to improve the chances of success by giving the system time to recover from temporary issues.



Deep down into the code:

The retryAsyncCallback function is a retry pattern used in asynchronous programming. It takes an asyncFn (such as an API call or serial port read) and retries it with increasing delays if an error occurs. The initialTimeout sets the delay before the first retry, and maxRetries limits the number of retries. If all retries fail, it throws an error. The function handles transient failures and improves the chances of successful execution.

```js
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
```
