		const x = [];
		let sumA = 0;
		let sumD = 0;
		let popp = 0;
		let newAPI = 'https://covid-api.com/api/reports?2021-08-31&iso=USA';

		
		/****************** GET THE DAYS OF THE LAST 90 DAYS *****************************/

		for (let i = 0; i < 1000; i++){
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
			const response = await fetch("https://covid-193.p.rapidapi.com/countries", {
				"method": "GET",
				"headers": {
					"x-rapidapi-host": "covid-193.p.rapidapi.com",
					"x-rapidapi-key": "971dd3145bmsha650a70d9fd1399p123526jsnf76245687e21"
				}
			});
			const data = await response.json();
			console.log(data.response);
			for (let i = 0; i < data.response.length; i++) {
					//console.log(data.data[i].name);
					const select = document.getElementById('countDrop');
					const d = `<option value="${data.response[i]}">${data.response[i]}</option>`;
					const option = document.createElement('option');
					option.setAttribute('value', `${data.response[i]}`);
					option.innerText = (`${data.response[i]}`);
					select.appendChild(option);
				}
			}
			/****************** CONSTRACT NEW API (COUNTRY, DATE, POPULATION) ********************/

			function getNewAPI() {

				const selectedCountry = countDrop.options[countDrop.selectedIndex].value;
				const selectedDate = dateDrop.options[dateDrop.selectedIndex].value;
				newAPI = (`https://covid-193.p.rapidapi.com/history?country=${selectedCountry}&day=${selectedDate}`);
				console.log(newAPI)

				goo();
					async function goo() {
						const response = await fetch(newAPI, {
							"method": "GET",
							"headers": {
								"x-rapidapi-host": "covid-193.p.rapidapi.com",
								"x-rapidapi-key": "971dd3145bmsha650a70d9fd1399p123526jsnf76245687e21"
							}
						});
						const data = await response.json();	
						let dths = [];
						let act = [];
						console.log(data)
					
						let morto = [];
						let actuato = []
						// console.log(dths)
						for (let i = 0; i < data.response.length; i++) {
							act.push(data.response[i].cases);
							dths.push(data.response[i].deaths);
							let dd = Object.values(dths[i]);
							let aa = Object.values(act[i]);
							morto.push(parseInt(dd[1]))
							actuato.push(parseInt(aa[4]))
						}
						
						sumD = Math.round((morto.reduce((a, b) => a + b, 0) / morto.length) / 1000);
						sumA = Math.round((actuato.reduce((a, b) => a + b, 0) / actuato.length) / 1000);
						popp = 1000 - sumA - sumD;
						console.log(popp, sumA, sumD)
						let activeCases;
						let deathsTD;
						let popul;
						if (data.response.length === 0) {
							activeCases = "'no data'";
							deathsTD = "'no data'";
							popul = "'no data'";
						} else {
							activeCases = `${sumA} / 1 million`;
							deathsTD = `${sumD} / 1 million`;
							popul = data.response[0].population;
						}
						
				isOn = true;
				document.getElementById('active').innerText = (`Active Cases: ${activeCases}`);
				document.getElementById('deaths').innerText = (`Deaths that day: ${deathsTD}`);
				document.getElementById('popul').innerText = (`Total Population: ${popul}`);
			}

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




		
