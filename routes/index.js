var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prime Number Graph' });
});

module.exports = router;


router.get('/primeNumbers', function(request, res) {

  //variable for the final JSON string
  var graphDataString;

  //Function call with call back
  calculatePrimes(function(){
    res.send(graphDataString)
  });

  /*
   * This function finds the prime number within the given user range
   * It Then counts the number of primes per chunk and stores that number in a
   * Javascript object which is prepared as a string to be set back to the user
   *
   * @param A call back
   */
  function calculatePrimes(next) {

    //get user input
    var min = parseInt(request.query.min);
    var max = parseInt(request.query.max);

    //Make sure input is valid
    if(isNaN(min) || min < 0){
      min = 0;
    }

    if(isNaN(max) || max < 0){
      max = 10000;
    }

    if(min > max){
      min = 0;
      max = 10000;
    }

    //variables
    var graphData= {};
    var numPrimes = 0;
    var chunkSize = Math.round((max-min)/100);
    var chunk = 0;
    var count = 0;
    var prime;

    //Chunk size can't be less than one
    if(chunkSize < 1){
      chunkSize = 1;
    }

    /* Iterate through and finds prime numbers (change this to use square numbers, more efficient),
     * Iterates though each chunk and count the number of primes and record the reasults
     */
    for (var i = min; i < max; i++) {
      chunk++;
      prime = true;
      for (var n = 2; n <= i - 1; n++) {
        if (i % n == 0) {
          prime = false;
        }
      }
      count++;
      if (prime) {
        numPrimes++;
      }
      if(count == chunkSize){
        //store number of primes in chunk and reset for next chunk
        graphData[chunk] = numPrimes;
        numPrimes = 0;
        count = 0;

      }
    }

  graphDataString = JSON.stringify(graphData);

  next();

}

});
