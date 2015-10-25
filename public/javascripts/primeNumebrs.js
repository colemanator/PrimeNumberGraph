/**
 * Created by Peter on 25/10/15.
 */
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
            document.getElementById('num-primes').innerHTML = primeNumbersJSON.number;

        }
    }
    //open with variables and send
    xmlhttp.open("GET", "primeNumbers?min=" + min + "&max=" + max, true);
    xmlhttp.send();

}