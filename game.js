// Few Variables

var Player;
var press;
var pipe1 = [];
var pipe2= [];
var ground = [];
var otherobj;
var bg;

// Defines some Canvas properties
var GameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
      this.canvas.width = 600;
      this.canvas.height = 800;
      this.context = this.canvas.getContext("2d");
      document.body.insertBefore(this.canvas, document.body.childNodes[0]);
      this.interval = setInterval(updateGameArea, 20);
      this.frameNo = 0;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      },
    stop : function() {
        clearInterval(this.interval);
    },
    gravity : 0.7   
  }

function everyinterval(n) {
  if ((GameArea.frameNo / n) % 1 == 0) {return true;}
  return false;
}

function startGame() {
    GameArea.start();
    Player = new creature(58, 40, "images/fatBird.png", 200, 200, "image");
}

// Defines pipes

function otherobj(width, height, color, x, y, type) {
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    if (type == "image") {
      this.image = new Image();
      this.image.src = color;
    }
    this.update = function(){
      if (type == "image") {
        ctx = GameArea.context;
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      } 
      else {
        ctx = GameArea.context;
        ctx.fillStyle = color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
      }
    }
}

// Defines player

function creature(width, height, color, x, y, type) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
    if (type == "image") {
        this.image = new Image();
        this.image.src = color;
      }
  this.update = function(){
      if (type == "image") {
          ctx = GameArea.context;
          ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        } 
      else {
      ctx = GameArea.context;
      ctx.fillStyle = color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
      }
  };
this.velocity = 0;
this.lift = -10;
this.crashWith = function(otherobj) {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = otherobj.x;
    var otherright = otherobj.x + otherobj.width;
    var othertop = otherobj.y;
    var otherbottom = otherobj.y + otherobj.height;
    if ((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
      crash = false;
    }
    else {
        crash = true;
    }
    return crash;
  }
}

function Flap() {
    Player.velocity += GameArea.gravity;
    Player.y += Player.velocity;
    addEventListener("click", (event) => {
       var clicked = true;
       if(clicked = true) {
        Player.velocity = Player.lift;
        console.log("click");   
       }
    });  
}

function birbmovement() {
    var rockbottom = GameArea.canvas.height - Player.height; 
    var ceiling = GameArea.canvas.height - GameArea.canvas.height;
    if (Player.y < rockbottom && Player.y > ceiling) {
        Flap();
    }
    else if (Player.y = rockbottom) {
        GameArea.stop();
        alert("GAME OVER")
    }
    else if (Player.y = ceiling) {
        GameArea.stop();
        alert("GAME OVER")
    }
}

function updateGameArea(){
    var x, a, minHeight, maxHeight, height, minGap, maxGap, gap;
    for (i = 0; i < pipe1.length; i += 1) {
      if (Player.crashWith(pipe1[i]) ) {
        GameArea.stop();
          alert("YOU CRASHED :( GAME OVER");
        return;
      }
    }

    for (i = 0; i < pipe2.length; i += 1) {
        if (Player.crashWith(pipe2[i]) ) {
          GameArea.stop();
          alert("YOU CRASHED :( GAME OVER");
          return;
        }
    }

    GameArea.clear();

    GameArea.frameNo += 1;
    if (GameArea.frameNo == 1 || everyinterval(75)) {
        x = GameArea.canvas.height;
        a = GameArea.canvas.height - GameArea.canvas.height;
        minHeight = 200;
        maxHeight = 600;
        height = Math.floor(Math.random()*(maxHeight-minHeight+1)+minHeight);
        minGap = 150;
        maxGap = 200;
        gap = Math.floor(Math.random()*(maxGap-minGap+1)+minGap);

        pipe1.push(new otherobj(104, height, "images/full pipe top.png", x, a, "image")); 
        pipe2.push(new otherobj(104, x - height, "images/full pipe bottom.png", x, height + gap, "image"));
    }
    for (i = 0; i < pipe1.length; i += 1) {
      var score = document.getElementById("h1");
      pipe1[i].x += -5;
      pipe1[i].update();
      pipe2[i].x += -5;
      pipe2[i].update();
      ctx.font = "30px Monospace";
      ctx.fillStyle = "black";
      ctx.textAlign = "center";
      ctx.clearRect(280 ,200, 40, -40);
      ctx.fillText(i - 1, 300, 200); 
      ground.push(new otherobj(30, 30, "images/groundPiece.png", 0, 770, "image"));
      ground.x += 30;
    }
    birbmovement();
    Player.update();    
}

startGame();
updateGameArea();
// works like a charm*
// * - most of the time
