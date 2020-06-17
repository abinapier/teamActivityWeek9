const express = require('express')
var http = require('http')
const path = require('path')
const url = require('url')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .get('/math', function (req, res) {
  		const queryObject = url.parse(req.url,true).query;
  		let num1 = queryObject['num-one'];
  		let num2 = queryObject['num-two'];
  		let operator = queryObject['operator'];
  		let answer = calculate(num1, num2, operator);
  		console.log(answer);

  		res.render('pages/math', { solution: answer })
  		res.end();
  	 })
  .get('/math_service', function (req, res) {
  		const queryObject = url.parse(req.url,true).query;
  		let num1 = queryObject['num-one'];
  		let num2 = queryObject['num-two'];
  		let operator = queryObject['operator'];
  		let answer = calculate(num1, num2, operator);
  		console.log(answer);
  		res.setHeader('Content-Type', 'application/json');
  		res.send(JSON.stringify(answer));
  		res.end();
  	 })
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  


function calculate(numOne, numTwo, operator){
	let intOne = parseInt(numOne);
	let intTwo = parseInt(numTwo);

	switch(operator){
		case '+':
			return intOne+intTwo;
		break;
		case '-':
			return intOne-intTwo;
		break;
		case '/':
			if( intTwo != 0){
				return intOne/intTwo;
			}else{
				return "Can't divide by 0";
			}

		break;
		case '*':
			return intTwo*intOne;
		break;
	}
}