class Obstacle {
     constructor(cactus_single, cactus_double, cactus_double_large, flying_dino_animation) {
        this.cactus = createSprite(width, y +27, r/2, 75);
      
       this.cactus.velocity.x = speed;
       this.rand = random(1);
        if (this.rand < 0.20) {
           this.cactus.addImage('cactus',cactus_double_large);
           this.cactus.position.y -= 10;
        }
        else if (this.rand < 0.45) {
           this.cactus.addImage('cactus',cactus_double);
        }
        else if (this.rand< 0.65) {
           this.cactus.addImage('cactus',cactus_single);
        }
       else {
         if (random(1) < 0.5) {
         this.cactus.position.y -= 25;
         }
         else {
          this.cactus.position.y -= 70; 
         }
         this.cactus.velocity.x = speed * 1.5;
         this.cactus.addAnimation('dino',flying_dino_animation);
       }
     
        //this.cactus.debug =true;
        
     
        if (this.cactus.overlap(cacti) || cactus_distance < 40) {
          this.cactus.remove();
        }
        else {
          cacti.add(this.cactus);
          cactus_distance = 0;
       }
  
   }
}