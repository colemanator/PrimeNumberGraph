google.load('visualization', '1.1', {packages: ['line']});

/*
 * Draw the graph and also display text and total
 *
 * @param The JSO that contains the reasults
 * @param The min value entered by the user
 * @param the max value entered by the user
 */
function drawChart(graphData,min,max) {

    //variables
    var chunksize = Math.round((max - min)/100);
    var data = new google.visualization.DataTable();
    var total = 0;

    //start preparing data for table
    data.addColumn('number', 'number');
    data.addColumn('number', 'Number of Primes');


    //for each key and number in teh JSO put it in the table data object
    for(var key in graphData){
        var number = key;
        var numberOfPrimes = graphData[key];

        //count the number of primes
        total += parseInt(numberOfPrimes);

        data.addRow([parseInt(number), parseInt(numberOfPrimes)]);
    }

    //table options
    var options = {
        chart: {
            title: 'Prime Number distribution Chart',
            subtitle: 'number of primes per ' + chunksize,

        },
        width: 900,
        height: 500
    };

    //draw table
    var chart = new google.charts.Line(document.getElementById('linechart_material'));
    chart.draw(data, options);

    //display text and total
    document.getElementById('primes-text').innerHTML = 'Prime Numbers between ' + min +' and ' + max;
    document.getElementById('num-primes').innerHTML = 'Total: ' + total;
}

/*
 * Function called when the users has finished entering data
 * makes an ajax call back to the server to find, calculate and display the
 * graph and total
 */
function ajaxGetNumPrimes() {

    //get the user input
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

            //Call the draw function
            drawChart(primeNumbersJSON, min,max);

        }
    }
    //open with variables and send
    xmlhttp.open("GET", "primeNumbers?min=" + min + "&max=" + max, true);
    xmlhttp.send();

}


