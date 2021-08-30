		const countries = 'https://covid-api.com/api/regions?/';
		const data = 'https://covid-api.com/api/reports?date=2020-04-16&iso=USA/'
		const select = document.getElementById('countDrop');
		//let days = [];

		for (let i = 0; i < 90; i++){
			const date = new Date();
			const ninety = date-86400000*i
			//console.log(ninety)

			function formatDate(ninety) {
    			var d = new Date(ninety),
        		month = '' + (d.getMonth() + 1),
        		day = '' + d.getDate(),
       			 year = d.getFullYear();

    		if (month.length < 2) 
        		month = '0' + month;
    		if (day.length < 2) 
       		 day = '0' + day;

    		return [year, month, day].join('-');
			}
			//let days = new Array(formatDate(ninety))
			console.log(formatDate(ninety));
		}

		getCountry();

		async function getCountry(){
			const response = await fetch(countries);
			const data = await response.json();
				for (let i = 0; i < data.data.length; i++) {
					//console.log(data.data[i].name);
					const d = `<option value="${data.data[i].iso}">${data.data[i].name}</option>`;
					const option = document.createElement('option');
					option.setAttribute('value', `${data.data[i].iso}`);
					option.innerText = (`${data.data[i].name}`);
					select.appendChild(option);
				}
		}
		function selectCountry() {

		const selectedCountry = countDrop.options[countDrop.selectedIndex].value;
		//for (let all of )

		const newApi = `https://covid-api.com/api/reports?`
		console.log(selectedCountry)
		}


