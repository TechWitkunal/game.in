const startBox = document.querySelector(".start-box"),
    startXbtn = startBox.querySelector(".playerX"),
    startObtn = startBox.querySelector(".playerO"),
    playBoard = document.querySelector(".play-board"),
    players = document.querySelector(".play-board .players"),
    allbox = playBoard.querySelectorAll("section span"),
    resultBox = document.querySelector(".result"),
    wonText = resultBox.querySelector("header p"),
    replay = resultBox.querySelector(".option button");

window.addEventListener("load", () => {
    // adding function clickedBox to all span tag inside section
    for (let i = 0; i < allbox.length; i++) {
        allbox[i].setAttribute("onclick", "clickedBox(this)")
    }
    startXbtn.addEventListener("click", () => {
        startBox.classList.add("hide");
        playBoard.classList.add("show");
    })
    startObtn.addEventListener("click", () => {
        startBox.classList.add("hide");
        playBoard.classList.add("show");
        players.setAttribute("class", "players active player");
    })
})

let playerXIcon = "fa-solid fa-xmark";
let playerOIcon = "fa-regular fa-circle";
let playerSign = "X";
let runBot = true;

// when user click
function clickedBox(element) {
    if (players.classList.contains("player")) {
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.add("active");
        playerSign = "O";
        element.setAttribute("id", playerSign);
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
        playerSign = "X";
        element.setAttribute("id", playerSign);
    }
    selectWinner();
    playBoard.style.pointerEvents = "none";
    element.style.pointerEvents = "none";
    let randomDelayTime = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(function () {
        bot(runBot);
    }, randomDelayTime)
}

// when bot click
function bot(runBot) {
    if (runBot) {
        playerSign = "O";
        let array = []; // this array for storing places which are empty

        for (let i = 0; i < allbox.length; i++) {
            if (allbox[i].childElementCount == 0) {
                // if no icon is there in span than -> 
                array.push(i);
            }
        }
        let randomBox = array[Math.floor(Math.random() * array.length)] // getting random position for bot to play
        // allbox[randomBox]
        if (array.length > 0) {
            if (players.classList.contains("player")) {
                allbox[randomBox].innerHTML = `<i class="${playerXIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "X";
                allbox[randomBox].setAttribute("id", playerSign);
            } else {
                allbox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
                players.classList.remove("active");
                playerSign = "O";
                allbox[randomBox].setAttribute("id", playerSign);
            }
            selectWinner();
            allbox[randomBox].style.pointerEvents = "none";
            playBoard.style.pointerEvents = "auto";
        }
    }
}

function getId(idname) {
    return document.querySelector(".box" + idname).id;
}

function checkThreeId(val1, val2, val3, sign) {
    if (getId(val1) == sign && getId(val2) == sign && getId(val3) == sign) {
        return true;
    }
}

function selectWinner() {
    if (checkThreeId(1, 2, 3, playerSign) || checkThreeId(4, 5, 6, playerSign) || checkThreeId(7, 8, 9, playerSign) || checkThreeId(1, 4, 7, playerSign) || checkThreeId(2, 5, 8, playerSign) || checkThreeId(3, 6, 9, playerSign) || checkThreeId(1, 5, 9, playerSign) || checkThreeId(3, 5, 7, playerSign)) {
        console.log(playerSign + " win");
        runBot = false;
        bot(runBot);

        setTimeout(function () {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700)

        wonText.innerHTML = `Player <b>${playerSign}</b> won the match`;
    } else {
        if (getId(1) != "" && getId(2) != "" && getId(3) != "" && getId(4) != "" && getId(5) != "" && getId(6) != "" && getId(7) != "" && getId(8) != "" && getId(9) != "") {
            wonText.innerHTML = `Match get draw`;
            console.log(playerSign + " win");
        runBot = false;
        bot(runBot);

        setTimeout(function () {
            playBoard.classList.remove("show");
            resultBox.classList.add("show");
        }, 700)
        }
    }
    
    replay.addEventListener("click", () => {
        window.location.reload();
    })
}
