//https://www.oreilly.com/library/view/you-dont-know/9781491905142/ch04.html
class Particle {

  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(3,12);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }


  createParticle() {
    noStroke();
    fill('rgba(20,16,69,0.3)');
    circle(this.x,this.y,this.r);
  }

  moveParticle() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
/*
  joinParticles(particles) {
    particles.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke(200);
        line(this.x,this.y,element.x,element.y);
      }
    });
  }*/
}

class Active {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(5,10);
    this.xSpeed = random(-2,2);
    this.ySpeed = random(-1,1.5);
  }


  createActive() {
    noStroke();
    fill('rgba(255,16,16,0.8)');
    circle(this.x,this.y,this.r);
  }

  moveActive() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x+=this.xSpeed;
    this.y+=this.ySpeed;
  }
/*
  joinActive(active) {
    active.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(255,55,55,0.1)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }*/
}

class Deaths {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(7,15);
    this.xSpeed = random(-0.1,0.1);
    this.ySpeed = random(-0.1,0.1);
  }


  createDeaths() {
    noStroke();
    fill('rgba(55,16,55,0.9)');
    circle(this.x,this.y,this.r);
  }

  moveDeaths() {
    if(this.x < 0 || this.x > width)
      this.xSpeed*=-1;
    if(this.y < 0 || this.y > height)
      this.ySpeed*=-1;
    this.x += this.xSpeed;
    this.y += this.ySpeed;
  }
/*
  joinDeaths(deaths) {
    deaths.forEach(element =>{
      let dis = dist(this.x,this.y,element.x,element.y);
      if(dis<85) {
        stroke('rgba(55,55,255,0.1)');
        line(this.x,this.y,element.x,element.y);
      }
    });
  }*/
}