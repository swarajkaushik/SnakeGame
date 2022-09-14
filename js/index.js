//const { VirtualConsole } = require("jsdom");

// Game Constants & Variables
let inputDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const musicSound = new Audio("music/music.mp3");
let speed = 15;
speed = document.getElementById("pointsBar").value;
console.log("range slider", speed);
let score = 0;
let pause = false;
let topp = false;
let bottom = false;
let right = false;
let left = false;
let flagColor = 1;
let lastPaintTime = 0;
let snakeArr = [{ x: 13, y: 15 }];
let reverseFoodGame = false;
food = { x: 6, y: 7 };
let toggleSwitch = document.querySelector('input[type="checkbox"]').value;
//console.log("lavesh",toggleSwitch);
// Game Functions
// function reverse(snakeArr){
//     let start = 0;
//     let end = snakeArr.length;
//     while(start < end){

//     }
// }
function main(ctime) {
  window.requestAnimationFrame(main);
  // console.log(ctime)
  speed = document.getElementById("pointsBar").value;
  let toggleSwitch = document.querySelector('input[type="checkbox"]').checked;
  if (toggleSwitch === false) {
    reverseFoodGame = false;
  } else {
    reverseFoodGame = true;
  }
  //console.log("lavesh",toggleSwitch);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  }
  lastPaintTime = ctime;

  gameEngine();
}

function isCollide(snake) {
  // If you bump into yourself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
      console.log(snake[i].x, snake[i].y, snake[0].x, snake[0].y);
      console.log("lavesh", i);
      return true;
    }
  }
  // If you bump into the wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }

  return false;
}

var swapArrayElements = function (a, x, y) {
  if (a.length === 1) return a;
  a.splice(y, 1, a.splice(x, 1, a[y])[0]);
  return a;
};

async function gameEngine() {
  // Part 1: Updating the snake array & Food

  if (isCollide(snakeArr)) {
    gameOverSound.play();
    window.moveBy(500, 500);
    musicSound.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over. Press any key to play again!");
    snakeArr = [{ x: 13, y: 15 }];
    musicSound.play();
    score = 0;
    scoreBox.innerHTML = "Score: " + score;
    topp = false;
    bottom = false;
    left = false;
    right = false;
    speed = document.getElementById("pointsBar").value;
    console.log("range slider died", speed);
  }

  // If you have eaten the food, increment the score and regenerate the food
  if (snakeArr[0].y === food.y && snakeArr[0].x === food.x) {
    // if(flagColor === 2){
    //     snakeArr.reverse();
    // }
    foodSound.play();
    score += 1;

    if (score > hiscoreval) {
      hiscoreval = score;
      localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
      hiscoreBox.innerHTML = "HiScore: " + hiscoreval;
    }
    scoreBox.innerHTML = "Score: " + score;

    //add elements to the beginning of the array
    if (flagColor == 2 && reverseFoodGame === true) {
      let zeroth = snakeArr[snakeArr.length - 1];
      let first = snakeArr[snakeArr.length - 2];
      if (first === undefined) {
        if (inputDir.y === 0) {
          inputDir.x = -inputDir.x;
        } else {
          inputDir.y = -inputDir.y;
        }
      }
      // console.log(zeroth);
      // console.log(first);
      else {
        let diff_X = zeroth.x - first.x;
        let diff_Y = zeroth.y - first.y;
        if (diff_Y < 0) {
          //up case
          console.log("upcase");
          inputDir.x = 0;
          inputDir.y = -1;
          topp = true;
          bottom = true;
          left = false;
          right = false;
        } else if (diff_Y > 0) {
          //down case
          console.log("down case");
          inputDir.x = 0;
          inputDir.y = 1;
          topp = true;
          bottom = true;
          left = false;
          right = false;
        } else if (diff_X < 0) {
          //left case
          console.log("left case");
          inputDir.x = -1;
          inputDir.y = 0;
          topp = false;
          bottom = false;
          left = true;
          right = true;
        } else {
          //right case
          console.log("right case");
          inputDir.x = 1;
          inputDir.y = 0;
          topp = false;
          bottom = false;
          left = true;
          right = true;
        }
      }
      // if(inputDir.y === 0){
      //     inputDir.x = -inputDir.x;
      // }
      // else{
      //    inputDir.y = -inputDir.y;
      // }
      snakeArr.reverse();
      snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y,
      });
    } else {
      snakeArr.unshift({
        x: snakeArr[0].x + inputDir.x,
        y: snakeArr[0].y + inputDir.y,
      });
    }

    let a = 2;
    let b = 16;
    food = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
    let aa = 1;
    let bb = 4;
    let num = Math.round(aa + (bb - aa) * Math.random());
    flagColor = num;
    // if(score === 0){
    //     flagColor = 1;
    // }
    console.log(flagColor);
  }

  // Moving the snake

  if (pause === false) {
    for (let i = snakeArr.length - 2; i >= 0; i--) {
      snakeArr[i + 1] = { ...snakeArr[i] };
    }
    // console.log("Completed");
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;
    // for(let i=0;i<snakeArr.length;i++){
    //   console.log(snakeArr[i].x,snakeArr[i].y);
    // }
    // console.log("finally Completed");
  }

  // Part 2: Display the snake and Food
  // Display the snake
  board.innerHTML = "";
  snakeArr.forEach((e, index) => {
    snakeElement = document.createElement("div");
    snakeElement.style.gridRowStart = e.y;
    snakeElement.style.gridColumnStart = e.x;

    if (index === 0) {
      snakeElement.classList.add("head");
    } else {
      snakeElement.classList.add("snake");
    }
    board.appendChild(snakeElement);
  });
  // Display the food
  foodElement = document.createElement("div");
  foodElement.style.gridRowStart = food.y;
  foodElement.style.gridColumnStart = food.x;

  if (flagColor === 1 || flagColor === 3 || flagColor === 4) {
    foodElement.classList.add("food");
  } else {
    foodElement.classList.add("foodReverse");
  }
  board.appendChild(foodElement);
}

// Main logic starts here
//console.log(document.querySelector("#pointsBar"));

let hiscore = localStorage.getItem("hiscore");
if (hiscore === null) {
  hiscoreval = 0;
  localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
} else {
  hiscoreval = JSON.parse(hiscore);
  hiscoreBox.innerHTML = "HiScore: " + hiscore;
}

window.requestAnimationFrame(main);
window.addEventListener("keydown", (e) => {
  //inputDir = { x: 0, y: -1 }; // Start the game
  //   vertical = false;
  //   horizontal = false;
  //   console.log(
  //   "right and left are " + horizontal + " and topp bottom are " + vertical
  //   );
  let first = snakeArr[0];
  let second = snakeArr[1];
  musicSound.play();
  moveSound.play();
  switch (e.key) {
    case "ArrowUp":
      //  console.log("ArrowUp");
      console.log("up", topp);
      if (pause === true) {
        pause = false;
        musicSound.play();
      }
      first = snakeArr[0];
       second = snakeArr[1];
      if (second !== undefined) {
        let diff_X = first.x - second.x;
        let diff_Y = first.y - second.y;
        if (diff_Y !== 0) {
          break;
        }
      }

      inputDir.x = 0;
      inputDir.y = -1;

     

      break;

    case "ArrowDown":
      console.log("down", topp, bottom);
      if (pause === true) {
        pause = false;
        musicSound.play();
      }
      first = snakeArr[0];
      second = snakeArr[1];
      if (second !== undefined) {
        diff_X = first.x - second.x;
        diff_Y = first.y - second.y;
        if (diff_Y !== 0) {
          break;
        }
      }

      inputDir.x = 0;
      inputDir.y = 1;

     
      console.log("lavesh 4");
      break;

    case "ArrowLeft":
      console.log("Left", left, right);
      if (pause === true) {
        pause = false;
        musicSound.play();
      }
      first = snakeArr[0];
      second = snakeArr[1];
      if (second !== undefined) {
        diff_X = first.x - second.x;
        diff_Y = first.y - second.y;
        if (diff_X !== 0) {
          break;
        }
      }

      inputDir.x = -1;
      inputDir.y = 0;

     
      break;

    case "ArrowRight":
      //   console.log("ArrowRight");
      if (pause === true) {
        pause = false;
        musicSound.play();
      }
      first = snakeArr[0];
      second = snakeArr[1];
      if (second !== undefined) {
        diff_X = first.x - second.x;
        diff_Y = first.y - second.y;
        if (diff_X !== 0) {
          break;
        }
      }

      inputDir.x = 1;
      inputDir.y = 0;

     
      break;
    case " ":
      console.log("space pressed");
      if (pause === false) {
        pause = true;
        musicSound.pause();
      } else {
        pause = false;
        musicSound.play();
      }
      break;
    default:
      break;
  }
});
