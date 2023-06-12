let activeCases, ddeaths, population, flag;
let activePercent, deathsPercent, popp;
let date = '2023-03-09';
let isOn = false;
let start = true;


const url = 'https://countriesnow.space/api/v0.1/countries/iso';

const countDrop = document.getElementById('countDrop');
const dateDrop = document.getElementById('dateDrop');

(async function () {
    // GET THE DAYS OF THE LAST 90 DAYS
    const x = [];
    for (let i = 0; i < 1000; i++) {
        const today = new Date(2023, 0, 26);
        const ninety = today - 86400000 * i;
        const dates = dayjs(ninety).format('YYYY-MM-DD');
        x.push(dates);
        const option = document.createElement('option');
        option.setAttribute('value', dates);
        option.innerText = dates;
        dateDrop.appendChild(option);
    }

    // GET THE LIST OF COUNTRIES TO QUERY THE DATA
    try {
        const response = await fetch(url);
        const data = await response.json();
        const countries = data.data;
        console.log('countries:', countries);

        const options = countries.map((country) => {
            const option = document.createElement('option');
            option.setAttribute('value', country.Iso3);
            option.setAttribute('population', country.Iso2);
            option.innerText = country.name;
            return option;
        });
        countDrop.append(...options);

    } catch (error) {
        console.error(error);
    }
    getNewAPI('USA', date);
})();

function sumArray(array) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += array[i];
    }
    return sum;
}

function setAll() {
    dateDrop.setAttribute('style', 'display: none');
    const selectedOption = countDrop.options[countDrop.selectedIndex];
    const isoCovid = selectedOption.value;

    getNewAPI(isoCovid, '2020-04-01');
}

async function getNewAPI(country, date) {
    console.log(date, country);
    // https://covid-api.com/api/reports/total?date=2022-03-14&iso=USA

    const newAPI = `https://covid-api.com/api/reports/total?date=${date}&iso=${country}`;

    try {
        const response = await fetch(newAPI);
        const data = await response.json();
        console.log(data.data);

        // activeCases = sumArray(data.data.map((item) => item.active));
        activeCases = data.data.active;
        ddeaths = data.data.deaths;
        printData();

    } catch (error) {
        console.error(error);
    }
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
        population = result.population;
        flag = result.flag.emoji;
    } catch (error) {
        console.error(error);
    }
}

async function handleClickSubmit() {
    
    const selectedDate = dateDrop.options[dateDrop.selectedIndex];
    const selectedOption = countDrop.options[countDrop.selectedIndex];
    const isoCovid = selectedOption.value;
    const isoPopulation = selectedOption.getAttribute('population');

    try {
        await getNewAPI(isoCovid, selectedDate.value);
        await getPopulation(isoPopulation);
        start = false;
        activePercent = (activeCases / population) * 100;
        deathsPercent = (ddeaths / population) * 100;
        popp = 1000 - activePercent * 10 - deathsPercent * 10;
        isOn = true;
        printData();
        document.getElementById('adat').setAttribute('style', 'display: flex');
    } catch (error) {
        console.error(error);
    }
}

function printData() {
     
    document.getElementById('flag').innerText = flag;
    document.getElementById('active').innerHTML = `Active Cases: ${formatNumberWithDivisions(activeCases)} <span class='text-danger'>${activePercent.toFixed(2)}%</span>`;
    document.getElementById('deaths').innerHTML = `Deaths till date: ${formatNumberWithDivisions(ddeaths)} <span class='text-danger'>${deathsPercent.toFixed(2)}%</span>`;
    document.getElementById('popul').innerText = `Total Population: ${formatNumberWithDivisions(population)}`;
    
}

function formatNumberWithDivisions(number) {
    return number.toLocaleString();
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
