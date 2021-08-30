/*
const port = 5500;

//const cors = require('cors');
//CREATING SERVER

const express = require("express");
const app = express();

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('home.ejs')
})

app.listen(port, () => {
	console.log(`LISTENING ON PORT ${port}`);
})
*/

		const countries = 'https://covid-api.com/api/regions?/';

		getData();
		async function getData(){
			const response = await fetch(countries);
			const data = await response.json();
			const countryList = data.data;
			console.log(countryList);
		}