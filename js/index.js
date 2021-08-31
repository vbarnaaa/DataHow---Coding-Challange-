		const x = [];
		const deaths = [];
		const active = [];
		let newAPI = 'https://covid-api.com/api/reports?2021-08-31&iso=USA';
		
		

/****************** GET THE DAYS OF THE LAST 90 DAYS *****************************/

		for (let i = 0; i < 90; i++){
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
/****************** CONSTRACT NEW API (COUNTRY, DATE) ********************/
		
		

		function getNewAPI() {

			const selectedCountry = countDrop.options[countDrop.selectedIndex].value;
			const selectedDate = dateDrop.options[dateDrop.selectedIndex].value;
			newAPI = (`https://covid-api.com/api/reports?${selectedDate}&iso=${selectedCountry}`);
			console.log(newAPI);
			getData();
		async function getData() {
				const response = await fetch(newAPI);
				const data = await response.json();	
				//deaths = data.deaths;
				//const obj = JSON.parse(data);
				console.log(data.data[0].deaths,
							data.data[0].active);


			}
		}
		
		
