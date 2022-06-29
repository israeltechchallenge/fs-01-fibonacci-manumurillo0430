function fibonacciServer() {
    let userNum = document.getElementById('number').value; 
    let spinner = document.getElementById('spinner'); 
    let largerThan = document.getElementById('larger-than'); 
    let result = document.getElementById('result')
    if (userNum > 50) {
        largerThan.classList.remove('d-none');
        document.getElementById('number').style.color = "#D9534F";
        document.getElementById('number').style.borderColor = "#D9534F"
        spinner.classList.remove('spinner-border');
        result.classList.add('d-none');
    } else {
        result.classList.remove('d-none');
        spinner.classList.add('spinner-border');
        document.getElementById('number').style.color = "#373A3C"
        document.getElementById('number').style.borderColor = "#CCCCCC"
        largerThan.classList.add('d-none')
        spinner.classList.remove('d-none');
        document.getElementById('result').innerText = '';
        fetch(`http://localhost:5050/fibonacci/${userNum}`)
        .then(response => {
            if(!response.ok){
                return response.text()
                    .then(errorText => { throw new Error(errorText) })
            }
            return response.json()
        })  
        .then(data => {
            document.getElementById('result').innerText = data.result;
            document.getElementById('result').style.textDecoration = "underline";
            document.getElementById('result').style.fontWeight = "600";
            document.getElementById('result').style.color = "black";
            spinner.classList.add('d-none')
        })
        .catch(error => {
            spinner.classList.add('d-none');
            result.classList.remove('d-none');
            document.getElementById('result').innerText = 'Server Error: ' + error.message;
            document.getElementById('result').style.textDecoration = "none";
            document.getElementById('result').style.fontWeight = "400";
            document.getElementById('result').style.color = "#D9534F";
            document.getElementById('number').style.borderColor = "#CCCCCC"
        });
    }   
    listOfCalculations();

}

function listOfCalculations(){

    let spinnerResults = document.getElementById('spinnerResults')
    let fibonacciList = document.getElementById('fibonacci-list')
    spinnerResults.classList.remove('d-none');
    fibonacciList.innerText =''
    fetch(`http://localhost:5050/getFibonacciResults`)
    .then(response => {
    return response.json();
    })
    .then(data =>{   
    fibonacciList.style.listStyleType = "none";  
    for (let info of data.results.sort((a, b) => b["createdDate"] - a["createdDate"] ))
     {
        let li = document.createElement("li");
        li.innerHTML = `<li class="mb-3 ml-2"><div class="border-bottom border-dark pb-3">The Fibonnaci Of <strong>${info.number}</strong> is <strong>${info.result}</strong>. Calculated at: ${new Date(info.createdDate)}</div></li>`;
        fibonacciList.appendChild(li);
    }
        
        spinnerResults.classList.add('d-none');
       
    });  
    
}
document.getElementById('btn').addEventListener('click',fibonacciServer);
