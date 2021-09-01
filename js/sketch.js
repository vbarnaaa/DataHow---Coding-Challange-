
let particles = [];
let active = [];
let deaths = [];
let isOn = false;


function setup() {
  createCanvas(windowWidth, windowHeight);


  
    for ( let i = 0; i < 100; i++){
      active.push(new Active());
    }

    for (let i = 0; i < 300; i++) {
      particles.push(new Particle());
    }

    for (let i = 0; i < 10; i++) {
      deaths.push(new Deaths());
    }

}

function draw() {
  background(252);

    if (isOn === true) {
        particles = [];active = [];deaths = [];
        //console.log(sumA, sumD);
        for ( let i = 0; i < sumA/100; i++){
          active.push(new Active());

        }

        for (let i = 0; i < popp/500000; i++) {
          particles.push(new Particle());
        }

        for (let i = 0; i < sumD; i++) {
          deaths.push(new Deaths());
        }
        isOn = false;
     }

  for(let i = 0;i<particles.length;i++) {
    particles[i].createParticle();
    particles[i].moveParticle();
    //particles[i].joinParticles(particles.slice(i));
  }
  for(let i = 0;i<active.length;i++) {
    active[i].createActive();
    active[i].moveActive();
    //active[i].joinActive(active.slice(i));
  }
  for(let i = 0;i<deaths.length;i++) {
    deaths[i].createDeaths();
    deaths[i].moveDeaths();
    //deaths[i].joinDeaths(deaths.slice(i));
  }


    text("Active Cases: " + sumA, 10, 50)
    text("Deaths That Day: " + sumD, 10, 100)
    text("Population: " + popp, 10, 150)
    textSize(32);
    //storke(20);
}

