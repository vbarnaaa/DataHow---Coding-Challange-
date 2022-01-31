
let particles = [];
let active = [];
let deaths = [];
let isOn = false;
          
/******** INITIALIZE THE PARTICLE SYSTEM ON LOAD ***************************/
function setup() {
  createCanvas(windowWidth, windowHeight);

    for ( let i = 0; i < 56; i++){
      active.push(new Active());                // NEW CASES
    }

    for (let i = 0; i < 940; i++) {
      particles.push(new Particle());           // POPULATION
    }

    for (let i = 0; i < 3; i++) {
      deaths.push(new Deaths());                // DEATHS
    }

}

/******** LOOP THAT LISTENS TO CHANGES ***************************/

function draw() {
  background(252);

/******** DELETING OLD AND ADDING NEW PARTICLES WHEN 'SUBMIT' CLICKED ***************************/

    if (isOn === true) {
        
        particles = [];active = [];deaths = []; // clear the array of previous particles

        for ( let i = 0; i < sumA/1000; i++){    // creating an array of 'new cases' with number of new cases divided by 100
          active.push(new Active());
        }
        for (let i = 0; i < popp/1000; i++) { 
          particles.push(new Particle());       // creating an array of 'populations' with number of country total population divided by 500 000
        }
        for (let i = 0; i < sumD/1000; i++) {
          deaths.push(new Deaths());            // creating an array of 'deaths' with the number of new deaths
        }
        isOn = false;                           // disable function after arrays are generated
     }

/******** CREATING PARTICLE ***************************************/

  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
  }
  for(let i = 0;i<active.length;i++) {
    active[i].createActive();
    active[i].moveActive();
  }
  for(let i = 0;i<deaths.length;i++) {
    deaths[i].createDeaths();
    deaths[i].moveDeaths();
  }

}

/******** OPEN NAVIGATION BAR ON MOUSECLICK ***************************/

function mousePressed(){
  openNav();
}
        