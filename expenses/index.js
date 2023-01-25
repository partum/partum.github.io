// fetch('./data.json')
//     .then((response) => response.json())
//     .then((json) => console.log(json));



async function populate() {
    //let total = document.getElementById('total');
    const requestURL = './data.json';
    const request = new Request(requestURL);

    const response = await fetch(request);
    const transactions = await response.json();

    populateTotal(transactions);
    populateGraph(transactions);
}


function populateTotal(obj) {
    let result = 0;
    for (let i = 0; i < obj.length; i++) {
        result += obj[i].amount
    }
    result = Math.round(result * 100) / 100
    total.innerHTML = '$' + result;
}

function populateGraph(obj){
    let result = findMax(obj);
    let max = result[0];
    let day = result[1];

    document.getElementById('mon').style.height = ((obj[0].amount/max)*100 + '%')
    document.getElementById('tue').style.height = ((obj[1].amount/max)*100 + '%')
    document.getElementById('wed').style.height = ((obj[2].amount/max)*100 + '%')
    document.getElementById('thu').style.height = ((obj[3].amount/max)*100 + '%')
    document.getElementById('fri').style.height = ((obj[4].amount/max)*100 + '%')
    document.getElementById('sat').style.height = ((obj[5].amount/max)*100 + '%')
    document.getElementById('sun').style.height = ((obj[6].amount/max)*100 + '%')

    document.getElementById(day).classList.add("maxBar");

    //document.getElementById('mon').innerHTML
    let spentEl = document.getElementsByClassName('spent');
    console.log(spentEl)
    for (let j = 0; j < spentEl.length; j++){
        spentEl[j].innerHTML = obj[j].amount
    }
}

function findMax(foo){
let result = [0, 'mon'];
    for (let i = 0; i < foo.length; i++) {
        if (foo[i].amount >= result[0]){
            result[0] = foo[i].amount
            result[1] = foo[i].day
        }
    }
    return result;
}

populate();

