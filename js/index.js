		const countries = 'https://covid-api.com/api/regions?/';
		//const data = 'https://covid-api.com/api/reports?date=2020-04-16&iso=USA/'
		const select = document.getElementById('countDrop');
		//let selectedCountry = 'US';
		const x = [];
		const y = []
		let rv = {};

		for (let i = 0; i < 90; i++){
			const date = new Date();
			const ninety = date-86400000*i;
			
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
			x.push(formatDate(ninety));
			
			//console.log(newApi);
		}

		console.log(x);
		//console.log(rv);
		getCountry();

		async function getCountry(){
			const response = await fetch('https://covid-api.com/api/regions?/');
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
		
		async function selectCountry() {

		selectedCountry = countDrop.options[countDrop.selectedIndex].value;

		for (let i = 0; i < x.length; i++){
			const newApi = [(`https://covid-api.com/api/reports?${x[i]}&iso=${selectedCountry}`)]
			
			getY();
			async function getY(){
				const response = await fetch(newApi);
			    const data = await response.json();
			    y.push(data)
			    //const arr = data[0];
			    console.log(data)
			    //data.active = v
			    
			    
			}
			//console.log(y)
			

		}
		
		
		//console.log(selectedCountry)
		
		//return newApi;
		} 
		//.then(console.log(y))


const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: x,
        datasets: [{
            label: '# of Votes',
            data: y,
            backgroundColor: [
 
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [

                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});