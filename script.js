let result = document.getElementById('result')
let spinner = document.getElementById('spinner'); 
let largerThan = document.getElementById('larger-than'); 
let newItemList = document.getElementById('new-item-list');
const fibonacciServer = async () => {
    let userNum = document.getElementById('number').value; 
    if (userNum > 50) {
        alert();
    }  else { 
        try {
                resetStyle();
                const res = await fetch(`http://localhost:5050/fibonacci/${userNum}`);
                const data = await res.json();
        result.innerText = data.result;
        resultStylte();
        listOfCalculations();
        } 
        catch (error) {
             if( userNum < 0){
                    alert()
                    largerThan.innerText = `Can't be smaller than 1`
                    } else
                        errorStyle();
                        result.innerText = 'Server Error: 42 is the meaning of life'
                   
                    }
    }
}
const listOfCalculations = async() => {
    let spinnerResults = document.getElementById('spinnerResults');
    let fibonacciList = document.getElementById('fibonacci-list');
    spinnerResults.classList.remove('d-none');
    fibonacciList.innerText =''
    const res = await fetch(`http://localhost:5050/getFibonacciResults`)
    const data = await res.json();
    fibonacciList.style.listStyleType = "none"; 
    for (let info of data.results.sort((a, b) => b["createdDate"] - a["createdDate"] ))
     {
        let li = document.createElement("li");
        li.innerHTML = `<li class="mb-3 ml-2"><div class="border-bottom border-dark pb-3">The Fibonnaci Of <strong>${info.number}</strong> is <strong>${info.result}</strong>. Calculated at: ${new Date(info.createdDate)}</div></li>`;
        fibonacciList.appendChild(li);
    }
        spinnerResults.classList.add('d-none');  
     
}
const errorStyle = () => {
    spinner.classList.add('d-none');
    result.classList.remove('d-none');
    result.style.textDecoration = "none";
    result.style.fontWeight = "400";
    result.style.color = "#D9534F";
    document.getElementById('number').style.borderColor = "#CCCCCC"
}
const alert = () => {
    largerThan.classList.remove('d-none');
    document.getElementById('number').style.color = "#D9534F";
    document.getElementById('number').style.borderColor = "#D9534F"
    spinner.classList.remove('spinner-border');
    result.classList.add('d-none');
    largerThan.innerText = `Can't be larger than 50`
}
const resultStylte = () => {
    document.getElementById('result').style.textDecoration = "underline";
    document.getElementById('result').style.fontWeight = "600";
    document.getElementById('result').style.color = "black";
    result.classList.remove('d-none');
    spinner.classList.add('d-none');
}
const resetStyle = () =>{
    result.classList.remove('d-none');
        spinner.classList.add('spinner-border');
        document.getElementById('number').style.color = "#373A3C"
        document.getElementById('number').style.borderColor = "#CCCCCC"
        largerThan.classList.add('d-none')
        spinner.classList.remove('d-none');
        document.getElementById('result').innerText = '';

}

document.getElementById('btn').addEventListener('click',fibonacciServer);
