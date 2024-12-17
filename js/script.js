// Game constants and variables
let snakeDir = { x: 0, y: 0 };
const foodSound = new Audio("music/food.mp3");
const gameOverSound = new Audio("music/gameover.mp3");
const moveSound = new Audio("music/move.mp3");
const music = new Audio("music/music.mp3");
let speed = 10;
let lastPaintTime = 0;
let score = 0;
let highScoreVal;
let snakeArray = [
    { x: 11, y: 13 }
]
food = { x: 6, y: 8 };

// Game functins

function main(ctime) {
    window.requestAnimationFrame(main);
    if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
        return;
    }
    lastPaintTime = ctime;  // direct return horaha he toh else laganee ki zarorat nahi
    gameEngine();

}

function isCollide(sArr) {
    //If snake bump into itself
    for (let i = 1; i < snakeArray.length; i++) {
       if(snakeArray[i].x === snakeArray[0].x && snakeArray[i].y === snakeArray[0].y){
        return true;
       }
    }

    //If snake bump into a wall
    if(snakeArray[0].x >= 18  || snakeArray[0].x <= 0 || snakeArray[0].y >= 18  || snakeArray[0].y <= 0){
        return true;
    }
}

function gameEngine() {
    //Part 1: Updating the Snake array and Food
    if (isCollide(snakeArray)) {
        gameOverSound.play();
        music.pause();
        snakeDir = { x: 0, y: 0 };
        alert("Reload To Play Again!");
        snakeArray = [{ x: 13, y: 15 }];
        music.play();
        score = 0;
    }

    //If you have eaten the food icrement the score and uptade the food location
    if (snakeArray[0].y === food.y && snakeArray[0].x === food.x) {
        foodSound.play();
        score += 1;
        scoreBox.innerHTML = "Score: " + score;
        if(score > highScoreVal){
            highScoreVal = score;
            localStorage.setItem("highScore", JSON.stringify(highScoreVal));
            highScoreBox.innerHTML = "HighScore: " + highScoreVal;
        }
        snakeArray.unshift({ x: snakeArray[0].x + snakeDir.x, y: snakeArray[0].y + snakeDir.y })
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }

    // Move the body of the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {   // Start from the second last element
        snakeArray[i + 1] = { ...snakeArray[i] };        // Copy the current segment to the next segment
    }

    // Move the head of the snake
    snakeArray[0].x += snakeDir.x;  // Update head's X coordinate
    snakeArray[0].y += snakeDir.y;  // Update head's Y coordinate


    //Part 2: Display the snake and Food
    //Display the snake
    board.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y   // y for row here
        snakeElement.style.gridColumnStart = e.x   // x for columns here
        if (index === 0) {
            snakeElement.classList.add("head");
        }
        else {
            snakeElement.classList.add("snake");
        }
        board.appendChild(snakeElement);
    })

    //Display the Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food");
    board.appendChild(foodElement);
}

// Main Logic starts here
let highScore = localStorage.getItem("highScore");
if(highScore === null){
    highScoreVal = 0;
    localStorage.setItem("highScore", JSON.stringify(highScoreVal));
}
else{
    highScoreVal = JSON.parse(highScore);
    highScoreBox.innerHTML = "HighScore: " + highScore;
}

window.requestAnimationFrame(main);

window.addEventListener("keydown", e => {
    snakeDir = { x: 0, y: 1 };
    moveSound.play(); 
    music.play();
    
    switch (e.key) {
        case "ArrowUp":
            snakeDir.x = 0;
            snakeDir.y = -1;  // y-axis par ooper jayga toh aik kam hoga
            break;

        case "ArrowDown":
            snakeDir.x = 0;
            snakeDir.y = 1;
            break;

        case "ArrowLeft":
            snakeDir.x = -1;
            snakeDir.y = 0;
            break;

        case "ArrowRight":
            snakeDir.x = 1;
            snakeDir.y = 0;
            break;

        default:
            break;
    }
})