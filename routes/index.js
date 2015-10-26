var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prime Number Graph' });
});

module.exports = router;


router.get('/primeNumbers', function(request, res) {

  var graphDataString;

  calculatePrimes(function(){
    res.send(graphDataString)
  });


function calculatePrimes(next) {

  var min = parseFloat(request.query.min);
  var max = parseFloat(request.query.max);
  var graphData= {};
  var numPrimes = 0;
  var chunkSize = Math.round((max-min)/100);
  var chunk = 0;
  var count = 0;
  if(chunkSize < 1){
    chunkSize = 1;
  }
  var prime;

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
      graphData[chunk] = numPrimes;
      numPrimes = 0;
      count = 0;

    }
  }

  graphDataString = JSON.stringify(graphData);

  next();

}

});
