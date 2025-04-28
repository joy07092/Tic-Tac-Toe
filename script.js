let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let moveNumber = 0;
let turn0 = false;

const winPatterns = [   // box pattern for winning position
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (turn0) {
            box.innerText = "0";
            box.style.color = "blue"; // 0 will be blue
            turn0 = false;
        } else {
            box.innerText = "X";
            box.style.color = "red"; // X will be red
            turn0 = true;
        }
        box.disabled = true;

        moveNumber++;
        checkWinner();
    });
});


const handleResetOrNewGame = (message) => {  // for reset or start new game
    const userConfirmed = window.confirm(message);
    if (userConfirmed) {
        boxes.forEach((box) => {
            box.innerText = "";
            box.style.backgroundColor = "#ffffc7";
            box.disabled = false;
        });
        turn0 = false;
        moveNumber = 0;  // Reset move number 
        msgContainer.classList.add("hide");
        resetBtn.classList.remove("hide");
    }
};

resetBtn.addEventListener("click", () => handleResetOrNewGame("Are you sure you want to reset the game?"));
newGameBtn.addEventListener("click", () => handleResetOrNewGame("Are you sure you want to start a new game?"));

const showWinner = (winner) => {
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
}

const showDraw = () => {
    msg.innerText = `It's a Draw!`;
    msgContainer.classList.remove("hide");
    resetBtn.classList.add("hide");
};

const checkWinner = () => {
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                // Highlight winning pattern
                pattern.forEach((index) => {
                    boxes[index].style.backgroundColor = "#90EE90"; // light green color
                });

                showWinner(pos1Val);
                boxes.forEach((box) => box.disabled = true);
                resetBtn.classList.add("hide");
                return;
            }
        }
    }

    // Check for draw
    if (moveNumber === 9) {
        showDraw();
        boxes.forEach((box) => box.disabled = true);
    }
};
