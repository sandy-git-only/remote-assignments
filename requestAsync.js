// requestAsync.js
const url = "https://ec2-54-64-246-136.ap-northeast-1.compute.amazonaws.com/delay-clock";

var XMLHttpRequest = require('xhr2');
function requestCallback(url, callback) {
// write code to request url asynchronously
    const xhr = new XMLHttpRequest();
    const startTime = new Date().getTime();
    xhr.open('GET',url,true);
    xhr.onload = () =>{
        if (xhr.status ===200){
            let data = JSON.parse(xhr.responseText);
            const endTime = new Date().getTime();  // End time from response
            const executionTime = (endTime - startTime);
            console.log("ASynchronous requestCallback execution time:", executionTime, "ms");
            return callback(data);
        }
    };
    xhr.send();

}
function requestPromise(url) {
// write code to request url asynchronously with Promise
    
    return new Promise((resolve, reject) => {
        var XMLHttpRequest = require('xhr2');
        const startTime = new Date().getTime();
        const xhr = new XMLHttpRequest();
        xhr.open('GET',url);
        xhr.onload = () => {
            if(xhr.status === 200) {
                let data = JSON.parse(xhr.responseText);
                resolve(data);
                const endTime = new Date().getTime();  // End time from response
                const executionTime = (endTime - startTime);
                console.log("ASynchronous requestPromise execution time:", executionTime, "ms");
            }else{
                reject(Error(xhr.statusText));
            }
            
        };
        xhr.onerror = () => reject (Error('A network error occurred') );
        xhr.send();
        
    });
    
}
async function requestAsyncAwait(url) {
// write code to request url asynchronously
// you should call requestPromise here and get the result usingasync/await.
    const startTime = new Date().getTime();
    try{
        const response = requestPromise(url)
        const endTime = new Date().getTime();  // End time from response
        const executionTime = (endTime - startTime);
        response_await = await response.then(console.log)

        console.log("ASynchronous requestAsyncAwait execution time:", executionTime, "ms");
        return response_await;    
    } catch(error){
        throw error;
    }
    
}


// console.time('execution time')
requestCallback(url, console.log); // would print out the execution time
requestPromise(url).then(console.log);
requestAsyncAwait(url);
// console.timeEnd('execution time')
