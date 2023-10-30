
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
    let emptyIndexArr = []
    let cells = document.querySelectorAll(".cell");
    let playerOneTurn = true;
    let board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    const computerMark = "O";
    const humanMark = "X";
    let currentMark = humanMark;
    const announcement = document.querySelector(".announcement");
    

    cells.forEach(function(cell) {
        cell.addEventListener("click", playRound)
        
    })
    

    function populateCells() {
        for (i=0; i<board.length; i++) {
            if (board[i] === humanMark) {
                document.getElementById(`${i}`).textContent = humanMark;
            }

            else if (board[i] === computerMark) {
                document.getElementById(`${i}`).textContent = computerMark;
            }
        } 
    }
    



    function playRound(e) {
    
    if(!computerIsPlaying) {
        if(playerOneTurn && !e.target.textContent) {
            playerOneTurn = false;
            currentMark = computerMark;
            board.splice(e.target.id, 1, humanMark);
            populateCells();
            announcement.textContent = displayGame.playerTwo.username + " turn";
        }

        else if (!playerOneTurn && !e.target.textContent) {
            playerOneTurn = true;
            currentMark = humanMark;
            board.splice(e.target.id, 1, computerMark);
            populateCells();
            announcement.textContent = displayGame.playerOne.username + " turn";
        }

        
            setTimeout(displayWinner, 500)
        
        emptyIndex();
        }


    /*make computer play*/
    else if(computerIsPlaying) {
        if(playerOneTurn && !e.target.textContent) {
            board.splice(e.target.id, 1, humanMark);
            populateCells();
            setTimeout(displayWinner, 500)
            
            announcement.textContent = displayGame.playerTwo.username + " turn";
            playerOneTurn = false;
            currentMark = computerMark;
            setTimeout(computerMoves, 500);
        }
        

        
}}

function computerMoves() {
    emptyIndex();
    if(board[4] === 0) {
    board.splice(4, 1, computerMark);}
    else if(!playerOneTurn && emptyIndexArr.length>=7) {
     if(board[0] === 0 || board[2] === 0){
        if(board[0] === 0){
        board.splice(0, 1, computerMark)}
        else if (board[0] === humanMark){
            board.splice(2, 1, computerMark)
        }
    }}
    else if (!playerOneTurn){
    AiMakeBestMove();

   }


populateCells();
playerOneTurn = true;
setTimeout(displayWinner, 500)
}


    function displayWinner() {
        let results = checkResults(0)
        if(results === 10) {
            displayGame.playerTwo.score++;
            announcement.innerHTML = "Congrats, " + displayGame.playerTwo.username + " wins this Round! <br>" + displayGame.playerTwo.username + " turn"
            newRound();
            
         }

         else if(results === -10) {
            displayGame.playerOne.score++;
            announcement.innerHTML = "Congrats, " + displayGame.playerOne.username + " wins this Round! <br>" + displayGame.playerTwo.username + " turn"
            setTimeout(newRound, 1000); 
              
         }
         else if (results === 0) {
            playerOneTurn = true;
            announcement.innerHTML = "it's a Draw this time <br>" + displayGame.playerOne.username + " turn"
            setTimeout(newRound, 1000);
            

        }
    }
       

        
        
        

       
        

       



    function newRound() {
        board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        cells.forEach(function(cell) {
            cell.textContent = "";
            })
        

        if(displayGame.playerOne.score === 3 || displayGame.playerTwo.score === 3 ) {
            announcement.textContent = "Game Over"
            displayGame.displayFunction.showWinnerPopUp();
            displayGame.playerOne.score = 0;
            displayGame.playerTwo.score = 0;
            
        }

        displayGame.displayFunction.fillPlayerBoxes()
        }


        
        function emptyIndex() {
            emptyIndexArr = [];
            for(let i=0; i< board.length; i++) {
                if(board[i] !== humanMark && board[i] !== computerMark) {
                emptyIndexArr.push(i)}
            }
            return emptyIndexArr;
        }
    
        function AiMakeRandomMove() {
            let randomMove = emptyIndexArr[(Math.floor(Math.random() * emptyIndexArr.length))];
            board.splice(randomMove, 1, "O");
        }


        function checkResults(depth) {
            let result;
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]            // Diagonals
        ];
    
        for (const combination of winningCombinations) {
            const [a, b,  c] = combination;
            if (board[a] !== 0 && board[a] === board[b] && board[a] === board[c]) {
                if (board[a] === computerMark) {   
                    playerOneTurn = true;
                    result = 10;
                    
                }   
                    
                 else if (board[a] === humanMark) {   
                    playerOneTurn = false; 
                    result = -10; 
                }
                
            }}
        

            const emptyCellCount = board.filter(cell => cell !== humanMark && cell !== computerMark).length;
            
            if (emptyCellCount === 0) {
                playerOneTurn = true;
                result = 0;
        }
        
        return result;

        }
        

        function minimax(board, maximizer, depth, availableSpots) {
            
            availableSpots = [];
        
            if (checkResults(depth) === 10) {
                return 10 - depth; // Adjust the score by depth
            } else if (checkResults(depth) === -10) {
                return -10 + depth; // Adjust the score by depth
            } else if (checkResults(depth) === 0) {
                return 0;
            }
        
            const moves = [];
            if (depth === 0) {
            availableSpots = emptyIndex();
            console.log( "avail" + availableSpots[0] + availableSpots[1])} 
        
            for (let i = 0; i < availableSpots.length; i++) {
                let move = {};
                move.index = availableSpots[i];
                console.log(move.index)
                
        
                if (maximizer) {
                    board[availableSpots[i]] = computerMark;
                    move.score = minimax(board, false, depth + 1, availableSpots);
                    
                } else {
                    board[availableSpots[i]] = humanMark;
                    move.score = minimax(board, true, depth + 1, availableSpots);
                    
                }
        
                 // Reset the board state
                 board[availableSpots[i]] = 0;
                moves.push(move);
            }
        
            let bestMove;
            if (maximizer) {
                let bestScore = -Infinity;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score > bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                        console.log(i)
                        console.log("best move ai:" + bestMove )
                    }
                }
                console.log(moves)
            
                
            } else {
                let bestScore = Infinity;
                for (let i = 0; i < moves.length; i++) {
                    if (moves[i].score < bestScore) {
                        bestScore = moves[i].score;
                        bestMove = i;
                        console.log(i)
                        console.log("best move hu:" + bestMove)
                    }
                }
                console.log(moves)
            
                
            }
            
            return moves[bestMove]
        }


        


        function AiMakeBestMove() {
            let depth = 0;
            emptyIndexArr = emptyIndex();
            console.log("emp"+emptyIndexArr)
            for (let i = 0; i < emptyIndexArr.length; i++) {
                const index = emptyIndexArr[i];
                board[index] = computerMark;
                if (checkResults(depth) === 10) {
                    board[index] = computerMark;
                    playerOneTurn = true;
                    announcement.textContent = displayGame.playerOne.username + " turn";
                    return;
                }
                board[index] = 0;
            }
            for (let i = 0; i < emptyIndexArr.length; i++) {
                const index = emptyIndexArr[i];
                console.log("index" + index)
                board[index] = humanMark;
                if (checkResults(depth) === -10) {
                    board[index] = computerMark;
                    playerOneTurn = true;
                    announcement.textContent = displayGame.playerOne.username + " turn";
                    return;
                }
                board[index] = 0;
            } 
            bestMove = minimax(board, true, depth, emptyIndexArr);
            if (bestMove !== undefined) {
                board[bestMove.index] = computerMark;
                playerOneTurn = true;
                announcement.textContent = displayGame.playerOne.username + " turn";
            } 
            else {
                AiMakeRandomMove();
            }
        }
        

     

       
        
        return {
            board,
            cells,
            playerOneTurn,
            announcement,

          };
    
    })()

    

const displayGame = (function() {
    const twoPlayerBtn = document.querySelector(".twoplayerbtn");
    const onePlayerBtn = document.querySelector(".oneplayerbtn");
    const introPage = document.querySelector(".intropage");
    const game = document.querySelector(".game");
    const twoPlayerPopUp = document.querySelector(".twoplayerselection");
    const playerTwoLabel = document.getElementById("player2label");
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
        computerIsPlaying = false;
        showInputs();
        
    })
    onePlayerBtn.addEventListener("click", () => {
        computerIsPlaying = true;
        showInputs();
        
    })

    startButton.addEventListener ("click", showGame);
    

    function showGame() {
        game.style.display = "flex";
        introPage.style.display = "none";
        twoPlayerPopUp.display = "none";
        displayFunction.fillPlayerBoxes();
        announcement.textContent = playerOne.username + " turn";
        if(computerIsPlaying) {
        setTimeout(gameBoard.computerMoves, 500)
    }

    }

    function showInputs() {
        if(!computerIsPlaying) {
        twoPlayerPopUp.style.display = "flex";
        }
        else if(computerIsPlaying) {
        playerTwoLabel.textContent = "Computer's Name:"
        twoPlayerPopUp.style.display = "flex";
        }

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
            gameBoard.announcement.textContent = playerOne.username + " turn"
        
        })
        
        if (playerOne.score === 3) {
            winnerMessage.textContent = playerOne.username + "won this game!"
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



/*const computerGame = (function() {
    let computerMark = "O"
    let humanMark = "X"
    let emptyIndexArr = [];
    const AiFunctions = {
        emptyIndex: function() {
        emptyIndexArr = []
        for(let i=0; i<gameBoard.board.length; i++) {
            if(gameBoard.board[i] !== humanMark && gameBoard.board[i] !== computerMark) {
            emptyIndexArr.push(i)}
        }
        return emptyIndexArr;
    },

    AiMakeRandomMove: function() {
        AiFunctions.emptyIndex();
        let randomMove = emptyIndexArr[(Math.floor(Math.random() * emptyIndexArr.length))];
        gameBoard.board.splice(randomMove, 1, "O");
    },

    minimax: function(currentBoard, currentMark) {
        gameBoard.playRound.checkWinner();
        if(gameBoard.winPlayerTwo) {
            return {score: 10}
        }

        else if (gameBoard.winPlayerOne) {
            return {score: -10}
        }

        else if (gameBoard.itsADraw) {
            return {score: 0}
        }
    const allPlayInfos = [];

    for (let i = 0; i < emptyIndexArr.length; i++) {
      const currentPlayInfo = []
      currentPlayInfo.index = CurrentBoard[emptyIndexArr[i]];
      currentBoard[emptyIndexArr[i]] = currentMark;

      if (currentMark === computerMark) {
        const result = minimax(currentBoard, humanMark);
        currentPlayInfo.score = result.score;
    } else {
    
        const result = minimax(currentBoard, computerMark);
        currentPlayInfo.score = result.score;
    }
        currentBoard[emptyIndexArr[i]] = currentPlayInfo.index;
        
        allPlayInfos.push(currentPlayInfo);
    }


    
    let bestMove = null;
    
    
    if (currentMark === computerMark) {
        let bestScore = -Infinity;
        for (let i = 0; i < allPlayInfos.length; i++) {
            if (allPlayInfos[i].score > bestScore) {
                bestScore = allPlayInfos[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < allPlayInfos.length; i++) {
            if (allPlayInfos[i].score < bestScore) {
                bestScore = allPlayInfos[i].score;
                bestMove = i;
            }
        }
    
    }
    return allTPlayInfos[bestMove];

    }

}

    return { AiFunctions, emptyIndexArr }

})(); */









