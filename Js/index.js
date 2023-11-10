const foodSound = new Audio("../music/food.mp3");
const gameoverSound = new Audio("../music/gameover.mp3");
const moveSound = new Audio("../music/move.mp3");
const musicSound = new Audio("../music/music.mp3");
let score = document.getElementById("score");
let scor = 0;
score.innerHTML = scor;

let inputDir = {
  x: 0,
  y: 0,
};

let food = {
  x: 7,
  y: 4,
};

let snackArr = [
  {
    x: 14,
    y: 14,
  },
];

const speed = 6;

let pointSpeed = 0;

function main(currentTime) {
  window.requestAnimationFrame(main);
  if ((currentTime - pointSpeed) / 1000 < 1 / speed) {
    return;
  }
  pointSpeed = currentTime;
  gameEngeen();
}
function gameEngeen() {
  if (isCollied(snackArr)) {
    gameoverSound.play();
    inputDir = {
      x: 0,
      y: 0,
    };
    alert("Game is over. Press Any to play again....!");
    let min = 1;
    let max = 17;
    snackArr = [
      {
        x: Math.round(Math.random() * (max - min) + 1) + min,
        y: Math.round(Math.random() * (max - min) + 1) + min,
      },
    ];
    scor = 0;
    score.innerHTML = 0;
  }
  if (snackArr[0].x === food.x && snackArr[0].y === food.y) {
    foodSound.play();
    scor += 1;
    score.innerHTML = scor;
    snackArr.unshift({
      x: snackArr[0].x + inputDir.x,
      y: snackArr[0].y + inputDir.y,
    });

    let min = 1;
    let max = 17;
    food = {
      x: Math.round(Math.random() * (max - min) + 1) + min,
      y: Math.round(Math.random() * (max - min) + 1) + min,
    };
  }
  for (let i = snackArr.length - 2; i >= 0; i--) {
    snackArr[i + 1] = { ...snackArr[i] };
  }
  snackArr[0].x += inputDir.x;
  snackArr[0].y += inputDir.y;

  let ground = document.getElementById("ground");
  ground.innerHTML = "";
  snackArr.forEach((e, ind) => {
    let div = document.createElement("div");
    div.style.gridRowStart = e.y;
    div.style.gridColumnStart = e.x;
    if (ind === 0) {
      div.classList.add("mouth");
    } else {
      div.classList.add("bodyPart");
    }
    ground.appendChild(div);
  });
  let div = document.createElement("div");
  div.style.gridRowStart = food.y;
  div.style.gridColumnStart = food.x;
  div.classList.add("food");
  ground.appendChild(div);
}

function isCollied(snack) {
  for (let i = 1; i < snack.length; i++) {
    if (snack[0].x === snack[i].x && snack[0].y === snack[i].y) {
      return true;
    }
  }
  if (snack[0].x < 0 || snack[0].x > 18 || snack[0].y < 0 || snack[0].y > 18) {
    return true;
  }
  return false;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", (e) => {
  moveSound.play()
  switch (e.key) {
    case "ArrowUp":
      inputDir.x = 0;
      inputDir.y = -1;
      break;
    case "ArrowDown":
      inputDir.x = 0;
      inputDir.y = 1;
      break;
    case "ArrowLeft":
      inputDir.x = -1;
      inputDir.y = 0;
      break;
    case "ArrowRight":
      inputDir.x = 1;
      inputDir.y = 0;
      break;
  }
});

let up = document.getElementById("up");
let down = document.getElementById("down");
let left = document.getElementById("left");
let right = document.getElementById("right");

up.addEventListener("pointerdown", () => {
  inputDir.x = 0;
  inputDir.y = -1;
});
down.addEventListener("pointerdown", () => {
  inputDir.x = 0;
  inputDir.y = 1;
});
left.addEventListener("pointerdown", () => {
  inputDir.x = -1;
  inputDir.y = 0;
});
right.addEventListener("pointerdown", () => {
  inputDir.x = 1;
  inputDir.y = 0;
});
