
function createPlayer(username, marker) {
    return {
        username: username,
        marker: marker,
        score: 0,
        greeting() {
            alert ("Good Luck " + username)
        }
    }
}



const gameBoard = (function () {
    let isGameOver = false;
    let cells = document.querySelectorAll(".cell");
    let playerOneTurn = true;
    let playerOne;
    let playerTwo;
    let board = [0, 0, 1, 1, 2, 2, 0, 0, 1];
    const announcement = document.querySelector(".announcement");

    cells.forEach(function(cell) {
        cell.addEventListener("click", playRound)
        
    })



    function playRound(e) {
        
        if(playerOneTurn && !e.target.textContent) {
            e.target.textContent = displayGame.playerOne.marker;
            playerOneTurn = false;
            board.splice(e.target.id, 1, "X");
            announcement.textContent = displayGame.playerTwo.username + " turn";
        }

        else if (!playerOneTurn && !e.target.textContent) {
            e.target.textContent = displayGame.playerTwo.marker;
            playerOneTurn = true;
            board.splice(e.target.id, 1, "O");
            announcement.textContent = displayGame.playerOne.username + " turn";
        }

        setTimeout(checkWinner, 500)


    }


    function checkWinner() {
        if(board[0] === board[1] && board[0] === board[2]|| board[3] === board[4] && board[3] === board[5] || board[6] === board[7] && board[6] === board[8]) {
            isGameOver = true;
        }
        else if(board[0] === board[3] && board[0] === board[6]|| board[1] === board[4] && board[1] === board[7] || board[2] === board[5] && board[2] === board[8]) {
            
            isGameOver = true;
        }

        else if(board[0] === board[4] && board[0] === board[8]|| board[2] === board[4] && board[2] === board[6]) {
            
            isGameOver = true;     
        }

        else if (!board.includes(0) && !board.includes(1) && !board.includes(2) && !isGameOver) {
            alert("it's a tie");
            newRound();
        }

        
        
        

        if(isGameOver && !playerOneTurn) {
            displayGame.playerOne.score++;
            displayGame.playerOneTurn = true;
            announcement.innerHTML = "Congrats, " + displayGame.playerOne.username + " wins this Round! <br>" + displayGame.playerTwo.username + " turn"
            newRound();
        }
    
        else if(isGameOver && playerOneTurn) {
            displayGame.playerTwo.score++;
            displayGame.playerOneTurn = false;
            announcement.innerHTML = "Congrats, " + displayGame.playerTwo.username + " wins this Round! <br>" + displayGame.playerOne.username + " turn"
            newRound();
        }

       
}


    function newRound() {
        board = [0, 0, 1, 1, 2, 2, 0, 0, 1];
        cells.forEach(function(cell) {
            cell.textContent = "";
            })
        isGameOver= false;

        if(displayGame.playerOne.score === 3 || displayGame.playerTwo.score === 3 ) {
            displayGame.displayFunction.showWinnerPopUp();
            displayGame.playerOne.score = 0;
            displayGame.playerTwo.score = 0;
            
        }

        displayGame.displayFunction.fillPlayerBoxes()
        }


        return {
            board,
            playerOne,
            playerTwo,
            isGameOver,
            cells,
            playerOneTurn,
          };

})()

const displayGame = (function() {
    const twoPlayerBtn = document.querySelector(".twoplayerbtn");
    const onePlayerBtn = document.querySelector(".oneplayerbtn");
    const introPage = document.querySelector(".intropage");
    const game = document.querySelector(".game");
    const twoPlayerPopUp = document.querySelector(".twoplayerselection");
    const startButton = document.querySelector(".button");
    const playerNameP1 = document.getElementById("h3p1");
    const playerNameP2 = document.getElementById("h3p2");
    const playerMarkerP1 = document.getElementById("p1p1");
    const playerMarkerP2 = document.getElementById("p1p2");
    const playerScoreP1 = document.getElementById("p2p1");
    const playerScoreP2 =  document.getElementById("p2p2");
    const playerOne = createPlayer("", "X");
    const playerTwo = createPlayer("", "O");
    const announcement = document.querySelector(".announcement");
    

    twoPlayerBtn.addEventListener("click", () => {
        showInputs();
        computerIsPlaying = false;
        
    })
    onePlayerBtn.addEventListener("click", () => {
        showInputs();
        computerIsPlaying = true;
        
    })

    startButton.addEventListener ("click", showGame)
    

    function showGame() {
        game.style.display = "flex";
        introPage.style.display = "none";
        twoPlayerPopUp.display = "none";
        displayFunction.fillPlayerBoxes();
        announcement.textContent = playerOne.username + " turn";

    }

    function showInputs() {
        twoPlayerPopUp.style.display = "flex";

    }

    const displayFunction = { 
        fillPlayerBoxes: function() {
        playerOne.username = document.getElementById("player1name").value;
        playerTwo.username = document.getElementById("player2name").value;
        playerNameP1.textContent = playerOne.username;
        playerNameP2.textContent = playerTwo.username;
        playerMarkerP1.textContent = "Marker: " + playerOne.marker;
        playerMarkerP2.textContent = "Marker: " + playerTwo.marker;
        playerScoreP1.textContent = "Score: " + playerOne.score;
        playerScoreP2.textContent = "Score: " + playerTwo.score;
        return { playerOne, playerTwo }
        },

        showWinnerPopUp: function() {
        const modal = document.querySelector(".modal");
        const winnerPopUp = document.querySelector(".winnerpopup");
        const winnerMessage = document.getElementById("winnermessage")
        const playAgainBtn = document.getElementById("playagain");

        playAgainBtn.addEventListener ("click", ()=> {
            modal.style.display = "none";
            winnerPopUp.style.display = "none";
        
        })
        
        if (playerOne.score === 3) {
            winnerMessage.textContent = playerOne.username + " won this game!"
        }

        else if (playerTwo.score === 3) {
            winnerMessage.textContent = playerTwo.username + " won this game!"
        }
        modal.style.display = "block";
        winnerPopUp.style.display = "flex";
        return { modal, winnerPopUp }
        }

        
    }

       

    return {
        
        playerOne,
        playerTwo,
        displayFunction
    }



})();







