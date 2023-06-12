//PARTICLES 'BLUEPRINT' FOR POPULATION

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
}

//PARTICLES 'BLUEPRINT' FOR NEW CASES

class Active {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(5,10);
    this.xSpeed = random(-1,1);
    this.ySpeed = random(-0.5,0.5);
  }


  createActive() {
    noStroke();
    fill('#ff2600');
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
}

//PARTICLES 'BLUEPRINT' FOR NEW DEATHS

class Deaths {
  constructor(){
    this.x = random(0,width);
    this.y = random(0,height);
    this.r = random(22,25);
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
}


