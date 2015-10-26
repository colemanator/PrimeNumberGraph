google.load('visualization', '1.1', {packages: ['line']});


function drawChart(graphData,min,max) {

    var chunksize = Math.round((max - min)/100);

    var data = new google.visualization.DataTable();
    data.addColumn('number', 'number');
    data.addColumn('number', 'Number of Primes');

    var total = 0;

    for(var key in graphData){
        var number = key;
        var numberOfPrimes = graphData[key];

        total += parseInt(numberOfPrimes);

        data.addRow([parseInt(number), parseInt(numberOfPrimes)]);
    }

    document.getElementById('primes-text').innerHTML = 'Prime Numbers between ' + min +' and ' + max;
    document.getElementById('num-primes').innerHTML = 'Total: ' + total;

    var options = {
        chart: {
            title: 'Prime Number distribution Chart',
            subtitle: 'number of primes per ' + chunksize,

        },
        width: 900,
        height: 500
    };

    var chart = new google.charts.Line(document.getElementById('linechart_material'));

    chart.draw(data, options);
}

function ajaxGetNumPrimes() {
    var min = document.getElementById("min").value;
    var max = document.getElementById("max").value;


    //new xmlhttp object
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        //if successful
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            //get the response text and parse it as JSON
            var primeNumbers = xmlhttp.responseText;
            var primeNumbersJSON = JSON.parse(primeNumbers);
            drawChart(primeNumbersJSON, min,max);

        }
    }
    //open with variables and send
    xmlhttp.open("GET", "primeNumbers?min=" + min + "&max=" + max, true);
    xmlhttp.send();

}


