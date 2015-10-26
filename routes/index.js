var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Prime Number Graph' });
});

module.exports = router;


router.get('/primeNumbers', function(request, res) {

  var primeNumbersString;

  calculatePrimes(function(){
    res.send(primeNumbersString)
  });


function calculatePrimes(next) {

  var min = parseFloat(request.query.min);
  var max = parseFloat(request.query.max);
  var numPrimes = 0;
  var prime;

  for (var i = min; i < max; i++) {
    prime = true;
    for (var n = 2; n <= i - 1; n++) {
      if (i % n == 0) {
        prime = false;
      }
    }
    if (prime) {
      numPrimes++;
    }
  }

  var primeNumbers = {
    number: numPrimes
  };

  console.log(numPrimes);

  primeNumbersString = JSON.stringify(primeNumbers);

  next();

}

});
