
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  update(dt) {
    this.offCanvasX = this.x < 1 || this.x > 500;
    this.offCanvasY = this.y < 1 || this.x > 600;

  }
  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

}

class Player extends Entity {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/char-cat-girl.png';
  }
  handleInput(keyup) {
    if(keyup ==='left'){
      this.x += -101;
        if(this.x <= 0) {
          this.x = 0;
        }
    }
    if(keyup === 'right') {
      this.x += 101;
        if(this.x >= 400) {
          this.x = 400;
        }
    }
    if(keyup === 'up') {
      this.y += -83;
        if(this.y <= 0){
          this.y = 0;
        }
    }
    if(keyup === 'down'){
      this.y += 83;
        if(this.y >= 450){
          this.y = 450;
        }
    }
  }
  checkCollisions() {
    if(this.y >= Enemy.y - 40 && this.y <= Enemy.y + 40){
     if(this.x >= Enemy.x - 40 && this.x <=
       Enemy.x + 40 ){
       player.x = 200;
       player.y = 400;
     }
    }
  }
  checkForWin(){
    if(player.y <= 42) {
      const modal = document.getElementById('myModal');
      modal.style.display = "block";
    }
  }

}

class Enemy extends Entity {
  constructor(x, y) {
    super(x, y);
    this.sprite = 'images/enemy-bug.png';
    this.speed = Math.floor((Math.random() * 175) + 50);
  }
  update(dt) {
    super.update();
    this.x += (this.speed * dt);

   if(this.offCanvasX) {
     this.x = +10;
   }else{
      this.x += (this.speed * dt);
   }
  }
  checkCollisions() {
    if(this.y >= player.y - 40 && this.y <= player.y + 40){
     if(this.x >= player.x - 40 && this.x <=
       player.x + 40 ){
       player.x = 200;
       player.y = 400;
     }
    }
  }

}

const player = new Player(200,400);

const enemyPositions = [
  [30, 70],
  [40, 150],
  [50, 230]
];
  // "position" argument is current value that loop is giving us from enemyPositions array
const allEnemies = enemyPositions.map(function(position) {
  const positionX = position[0];
  const positionY = position[1];
  return new Enemy(positionX, positionY);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);

});
