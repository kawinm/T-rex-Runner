class Runner {
   constructor(trex_animation, trex_fire_animation, trex_duck_animation) {
      this.height  = 100;
      this.width   = 50;
      this.x       = 75;
      this.y       = height - this.height;
      this.vy      = 0;
      this.ghost = createSprite(this.x, this.y , 85, 100);
    
     this.ghost.addAnimation("fire",trex_fire_animation);
    this.ghost.addAnimation("duck",trex_duck_animation); 
         this.ghost.addAnimation("walk",trex_animation);
     this.ghost.setCollider('rectangle',-3 , -5, 60, 83 );
    //this.ghost.debug = true;
   }
  
    jump() {
      if (this.ghost.position.y == this.y)  {
        this.ghost.velocity.y = jumpPower;
      }
    }

    move() {  
      this.ghost.velocity.y += gravity;
      /*if (this.ghost.velocity.y >= 0) {
         this.ghost.velocity.y = 0;
      }*/
      this.ghost.position.y = constrain(this.ghost.position.y, 0, this.y);
      if (this.ghost.getAnimationLabel () == "duck") {
        this.ghost.position.y += 25;
        this.ghost.setCollider('rectangle',0 , 0, 90, 52 );
      }
      else {
        this.ghost.setCollider('rectangle',-3 , -5, 60, 83 );
      }
      
    
    }

  show() {
    image(uImg, this.x, this.y, this.r, this.r);
  }
  
}