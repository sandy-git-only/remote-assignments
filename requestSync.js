// requestSync.js

const axios = require('axios');

const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

async function requestSync(url) {
    const startTime = new Date().getTime();

    try {
        const response = await axios.get(url);
        const endTime = new Date().getTime();
        const executionTime = endTime - startTime;
        console.log("Synchronous request execution time:", executionTime, "ms");
        console.log("Response data:", response.data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}


requestSync(url) // would print out the execution time
requestSync(url)
requestSync(url)

