const urlFibonacci = "http://localhost:5050/fibonacci/";



function fibonacciServer() {
    let result;
    let userNum = document.getElementById('number').value;    
    fetch(`http://localhost:5050/fibonacci/${userNum}`)
    .then(response => response.json())  
    .then(data => {
        document.getElementById('result').innerText = data.result;
     });
}

document.getElementById('btn').addEventListener('click',fibonacciServer);