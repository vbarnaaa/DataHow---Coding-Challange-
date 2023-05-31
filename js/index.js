const x = [];
// let sumA = 0;
// let sumD = 0;
// let popp = 0;
let newAPI = '';

let iso = 'US';
let country = 'USA';
let rawCountryList = [];

let activeCases, ddeaths, population, flag;
let activePercent, deathsPercent, popp;

const countDrop = document.getElementById('countDrop');
// const dateDrop = document.getElementById('dateDrop');


/****************** GET THE DAYS OF THE LAST 90 DAYS *****************************/

// for (let i = 200; i < 1000; i++) {
// 	const today = new Date(2022, 0, 26);
// 	const ninety = today - 86400000 * i;
// 	const dates = dayjs(ninety).format('YYYY-MM-DD')
// 	x.push(dates);
// 	const option = document.createElement('option');
// 	option.setAttribute('value', dates);
// 	option.innerText = (dates);
// 	dateDrop.appendChild(option);
// }

/****************** GET THE LIST OF COUNTRIES TO QUERY THE DATA ********************/
getCountry();
// getNewAPI("US");
getUserCountry(console.log)
function getUserCountry(callback) {
	// Create a script element to load the API
	var script = document.createElement('script');
	script.src = 'https://ipvigilante.com/jsonp/?callback=getUserCountryDetails';
  
	// Append the script element to the document
	document.getElementsByTagName('head')[0].appendChild(script);
  
	// Define a global callback function to process the API response
	window.getUserCountryDetails = function(details) {
	  // Return the country code to the original callback function
	  callback(details.data.country_code);
	  
	  // Remove the script element from the document
	  document.getElementsByTagName('head')[0].removeChild(script);
	};
  }
  
  // Example usage:
  getUserCountry(countryCode => {
	console.log('The user is in ' + countryCode);
  });
  
  
  // Example usage:
  getUserCountry(countryCode => {
	console.log('The user is in ' + countryCode);
  });
  
async function getCountry() {
	const url = 'https://countries-cities.p.rapidapi.com/location/country/list';
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '971dd3145bmsha650a70d9fd1399p123526jsnf76245687e21',
			'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const data = await response.json();
		const countryList = Object.values(data.countries).sort();
		rawCountryList = data.countries;
		const isoList = Object.keys(data.countries);
		// console.log('countryList', rawCountryList);

		for (let i = 0; i < countryList.length; i++) {
			// const select = document.getElementById('countDrop');
			const d = `<option value="${countryList[i]}">${countryList[i]}</option>`;
			const option = document.createElement('option');
			option.setAttribute('value', `${countryList[i]}`);
			option.innerText = (`${countryList[i]}`);
			countDrop.appendChild(option);
		}

	} catch (error) {
		console.error(error);
	}
}
/****************** CONSTRACT NEW API (COUNTRY, DATE, POPULATION) ********************/

function sumArray(array) {
	let sum = 0;
	for (let i = 0; i < array.length; i++) {
		sum += array[i];
	}
	return sum;
}

function getISO(countryName) {
	for (const code in rawCountryList) {
		if (rawCountryList.hasOwnProperty(code) && rawCountryList[code] === countryName) {
			return code;
		}
	}
	return null;
}

async function getPopulation(country) {

	const url = `https://countries-cities.p.rapidapi.com/location/country/${country}`;
	const options = {
		method: 'GET',
		headers: {
			'X-RapidAPI-Key': '971dd3145bmsha650a70d9fd1399p123526jsnf76245687e21',
			'X-RapidAPI-Host': 'countries-cities.p.rapidapi.com'
		}
	};

	try {
		const response = await fetch(url, options);
		const result = await response.json();
		console.log('population', result.population)
		population = result.population;
		flag = result.flag.emoji;
	} catch (error) {
		console.error(error);
	}
}

function getNewAPI(country) {
	// let newAPI = 'https://covid-api.com/api/reports?2021-08-31&iso=USA';
	let newAPI = `https://covid-api.com/api/reports?2023-03-09&region_name=${country}`
	getData(newAPI)
	console.log('newAPI', newAPI)

	async function getData(api) {
		const response = await fetch(api);
		const data = await response.json();
		const iso = data.data.map((item) => item.region.iso)[0].slice(0, 2);

		activeCases = sumArray(data.data.map((item) => item.active));
		ddeaths = sumArray(data.data.map((item) => item.deaths));
		population = getPopulation(iso);

		// console.log('data: ', data)
		console.log('data.data', data.data)
		// console.log("mapped: ", data.data.map((item) => item))
		// console.log("ISO: ", data.data.map((item) => item.region.iso)[0])
	}
	console.log('activeCases', activeCases, 'ddeaths', ddeaths, 'population', population);

}

function handleClickSubmit() {
	// let selectedDate = dateDrop.options[dateDrop.selectedIndex].value;
	let selectedCountry = countDrop.options[countDrop.selectedIndex].value;
	getNewAPI(selectedCountry);
	let selectedIso = getISO(selectedCountry)
	getPopulation(selectedIso);
	isOn = true;
	// const popPerThousand = population / 1000;
	activePercent = (activeCases / population) * 1000 ;
	deathsPercent = (ddeaths / population) * 1000 ;
	popp = 1000 - activePercent - deathsPercent;
	console.log('activePercent', activePercent, 'deathsPercent', deathsPercent, 'popp', popp);
	printData();
}

function printData() {
document.getElementById('flag').innerText = (`${flag}`);
document.getElementById('active').innerText = (`Active Cases: ${activeCases}`);
document.getElementById('deaths').innerText = (`Deaths that day: ${ddeaths}`);
document.getElementById('popul').innerText = (`Total Population: ${population}`);
}


/**************************************** NAVIGATION BAR **********************************/

function openNav() {
	document.querySelector(".click-text").style.opacity = "0";
	document.getElementById("mySidenav").style.width = "100%";
	document.getElementById("mySidenav").style.height = "100%";
}

function closeNav() {
	document.getElementById("mySidenav").style.width = "0";
}





