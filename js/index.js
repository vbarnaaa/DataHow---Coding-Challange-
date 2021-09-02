		const x = [];
		let sumA = 0;
		let sumD = 0;
		let popp = 0;
		let newAPI = 'https://covid-api.com/api/reports?2021-08-31&iso=USA';

		
		/****************** GET THE DAYS OF THE LAST 90 DAYS *****************************/

		for (let i = 0; i < 500; i++){
			const today = new Date();
			const ninety = today-86400000*i;
			const dates = dayjs(ninety).format('YYYY-MM-DD')
			x.push(dates);
			//console.log(dates)
			const dateSelect = document.getElementById('dateDrop');
			const option = document.createElement('option');
			option.setAttribute('value', dates);
			option.innerText = (dates);
			dateSelect.appendChild(option);
		}

		/****************** GET THE LIST OF COUNTRIES TO QUERY THE DATA ********************/
		getCountry();

		async function getCountry(){
			const response = await fetch('https://covid-api.com/api/regions?/');
			const data = await response.json();
			for (let i = 0; i < data.data.length; i++) {
					//console.log(data.data[i].name);
					const select = document.getElementById('countDrop');
					const d = `<option value="${data.data[i].iso}">${data.data[i].name}</option>`;
					const option = document.createElement('option');
					option.setAttribute('value', `${data.data[i].iso}`);
					option.innerText = (`${data.data[i].name}`);
					select.appendChild(option);
				}
			}
			/****************** CONSTRACT NEW API (COUNTRY, DATE, POPULATION) ********************/

			function getNewAPI() {

				const selectedCountry = countDrop.options[countDrop.selectedIndex].value;
				const selectedDate = dateDrop.options[dateDrop.selectedIndex].value;
				newAPI = (`https://covid-api.com/api/reports?date=${selectedDate}&iso=${selectedCountry}`);
				console.log(newAPI)

				getData();
				async function getData() {
					const response = await fetch(newAPI);
					const data = await response.json();	
				//console.log(data);
				
				let a=0; let d = 0;
				for (let i = 0; i < data.data.length; i++){
					d += data.data[i].deaths_diff;
					a += data.data[i].confirmed_diff;
				}
				console.log("active: " + a,"deaths: " + d)
				sumA = a;
				sumD = d;
				isOn = true;
				document.getElementById('active').innerText = (`Active Cases: ${numbro(sumA).format({thousandSeparated: true})}`)
				document.getElementById('deaths').innerText = (`Deaths that day: ${numbro(sumD).format({thousandSeparated: true})}`)
				document.getElementById('popul').innerText = (`Total Population: ${numbro(popp).format({thousandSeparated: true})}`)
			}

			const pop = (`https://restcountries.eu/rest/v2/alpha/${selectedCountry.toLowerCase()}`);
			
			getPop();
			async function getPop() {
				const response = await fetch(pop);
				const data = await response.json();
				popp = data.population;
				console.log("poulatio of the country: " + popp)
			}

		}

		/**************************************** NAVIGATION BAR **********************************/

		function openNav() {
			document.getElementById("mySidenav").style.width = "100%";
			document.getElementById("mySidenav").style.height = "100%";
		}

		function closeNav() {
			document.getElementById("mySidenav").style.width = "0";
		}





