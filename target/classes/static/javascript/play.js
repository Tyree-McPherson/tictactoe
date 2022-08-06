document.addEventListener("DOMContentLoaded", () => {
  
  // On page load, set the current stats.
  HandleGetAndSetStats();

  // Choose who initially goes first.
  HandleChooseTurn();
});

const HandleMouseMove = (event) => {
  
  const Circle = document.getElementById("play-game-circle");
  
  Circle.style.display = "block";
  Circle.style.left = event.pageX + "px";
  Circle.style.top = event.pageY + "px";
};

const HandleGetAndSetStats = () => {

  const Wins = localStorage.getItem("wins");
  const Draws = localStorage.getItem("draws");
  const Loses = localStorage.getItem("loses");
  const ElementWins = document.getElementById("play-game-stat-wins");
  const ElementDraws = document.getElementById("play-game-stat-draws");
  const ElementLoses = document.getElementById("play-game-stat-loses");
  
  ElementWins.innerText += Wins || "0";
  ElementDraws.innerText += Draws || "0";
  ElementLoses.innerText += Loses || "0";

  // If there are no wins, there are no stats. Therefore, set all the stats.
  if (!Wins) {
    localStorage.setItem("wins", "0");
    localStorage.setItem("draws", "0");
    localStorage.setItem("loses", "0");
  };
};

const HandleChooseTurn = () => {

  const RandomTurn = Math.floor(Math.random() * 2);
  const ElementTurnText = document.getElementById("play-game-turn-text");
  let TurnText = "";

  if (RandomTurn === 0) {

    TurnText = "COMPUTER'S TURN";

    ElementTurnText.innerText = TurnText;
    
    HandleComputersTurn();
  };
  
  if (RandomTurn === 1) {

    TurnText = "YOUR TURN";

    // When it is the users' turn, have a circle follow their mouse.
    document.addEventListener("mousemove", HandleMouseMove);
    document.addEventListener("click", HandleMouseClick);

    ElementTurnText.innerText = TurnText;
  };
};

const HandleComputersTurn = async () => {

  const ElementTurnText = document.getElementById("play-game-turn-text");
  let DecisionMade = false;

  // Give the illusion that the computer is "processing" or "thinking".
  await Sleep(1500);

  // Get the data of each square.
  const ArrayOfPlacements = HandleGetSquareData();

  // Try and place an X in an available square.
  // Keep looping, until a decision has been made.
  while (!DecisionMade) {

    const RandomPlacementOne = Math.floor(Math.random() * 3);
    const RandomPlacementTwo = Math.floor(Math.random() * 3);
    const CurrentPlacement = ArrayOfPlacements[RandomPlacementOne][RandomPlacementTwo];
    const PlacementSquare = ((RandomPlacementOne * 3) + 1) + RandomPlacementTwo;
    
    if (!CurrentPlacement) {
      document.getElementById(`play-game-square-${PlacementSquare}`).innerText = "X";
      document.getElementById(`play-game-square-${PlacementSquare}`).style.cursor = "default";
      DecisionMade = true;
    };
  };

  // Check if the computer won or if there is a draw.
  const GameOver = HandleCheckGameStatus("X");

  if (GameOver.Winner) {
    HandleGameOverOverlay(GameOver.Winner, GameOver.Squares);
    return;
  };

  ElementTurnText.innerText = "YOUR TURN";

  HandlePlayersTurn();
};

const HandlePlayersTurn = () => {

  document.addEventListener("mousemove", HandleMouseMove);
  document.addEventListener("click", HandleMouseClick);
};

const Sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds));
};

const HandleGetSquareData = () => {

  const NumberOfSquares = 9;
  const ArrayOfSquarePlacements = [[],[],[]];

  for (let i = 0; i < NumberOfSquares; i++) {
    
    const Square = document.getElementById(`play-game-square-${i + 1}`).innerText;

    if (i < 3) ArrayOfSquarePlacements[0].push(Square);

    if (i >= 3 && i < 6) ArrayOfSquarePlacements[1].push(Square);
    
    if (i > 5) ArrayOfSquarePlacements[2].push(Square);
  };
  
  return ArrayOfSquarePlacements;
};

const HandleCheckGameStatus = (Character) => {

  const SquareData = HandleGetSquareData();
  const SquareOne = SquareData[0][0];
  const SquareTwo = SquareData[0][1];
  const SquareThree = SquareData[0][2];
  const SquareFour = SquareData[1][0];
  const SquareFive = SquareData[1][1];
  const SquareSix = SquareData[1][2];
  const SquareSeven = SquareData[2][0];
  const SquareEight = SquareData[2][1];
  const SquareNine = SquareData[2][2];
  const ReturnData = {
    Winner: false,
    Squares: null
  };
  let DidSomeoneWin = false;

  /* Based on who's turn it is, check if they won.
    
  Possible winning scenarios (based on square ID's in the HTML):
  1, 2, 3
  4, 5, 6
  7, 8, 9
  1, 4, 7
  2, 5, 8
  3, 6, 9
  1, 5, 9
  3, 5, 7
  */

  if (SquareOne === Character && SquareTwo === Character && SquareThree === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "1-2-3";
  };

  if (SquareFour === Character && SquareFive === Character && SquareSix === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "4-5-6";
  };

  if (SquareSeven === Character && SquareEight === Character && SquareNine === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "7-8-9";
  };

  if (SquareOne === Character && SquareFour === Character && SquareSeven === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "1-4-7";
  };
  
  if (SquareTwo === Character && SquareFive === Character && SquareEight === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "2-5-8";
  };

  if (SquareThree === Character && SquareSix === Character && SquareNine === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "3-6-9";
  };

  if (SquareOne === Character && SquareFive === Character && SquareNine === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "1-5-9";
  };

  if (SquareThree === Character && SquareFive === Character && SquareSeven === Character) {
    DidSomeoneWin = true;
    ReturnData.Squares = "3-5-7";
  };

  if (DidSomeoneWin) {
    HandleUpdateStats(Character);
    ReturnData.Winner = Character;
    return ReturnData;
  };

  // If all square data is full, rule it a draw.
  if (
    SquareOne && SquareTwo && SquareThree && SquareFour && SquareFive &&
    SquareSix && SquareSeven && SquareEight && SquareNine
  ) {
    HandleUpdateStats("draw");
    ReturnData.Winner = "draw";
    return ReturnData;
  };

  // If no one won or a draw was not concluded, the game is not over.
  return ReturnData;
};

const HandleMouseClick = (event) => {

  const Square = event.target.innerText;
  const Id = event.target.id;
  const ElementTurnText = document.getElementById("play-game-turn-text");

  // If the square is full, do nothing.
  if (Square || !Id.includes("play-game-square")) return;

  document.getElementById(Id).innerText = "O";
  document.getElementById(Id).style.cursor = "default";

  // Remove the circle that follows the mouse.
  HandleHideMouse();

  // Check if the player won or if there is a draw.
  const GameOver = HandleCheckGameStatus("O");

  if (GameOver.Winner) {
    HandleGameOverOverlay(GameOver.Winner, GameOver.Squares);
    return;
  };

  ElementTurnText.innerText = "COMPUTER'S TURN";

  document.removeEventListener("click", HandleMouseClick);

  HandleComputersTurn();
};

const HandleUpdateStats = (GameStatus) => {

  const Wins = parseInt(localStorage.getItem("wins"), 10);
  const Draws = parseInt(localStorage.getItem("draws"), 10);
  const Loses = parseInt(localStorage.getItem("loses"), 10);

  // Depending on the outcome of the game, update the stats accordingly.
  if (GameStatus === "O") localStorage.setItem("wins", Wins + 1);
  if (GameStatus === "draw") localStorage.setItem("draws", Draws + 1);
  if (GameStatus === "X") localStorage.setItem("loses", Loses + 1);
};

const HandleHideMouse = () => {
  document.removeEventListener("mousemove", HandleMouseMove);
  document.getElementById("play-game-circle").style.display = "none";
};

const HandleGameOverOverlay = async (Winner, Squares) => {

  HandleDrawLineThroughWin(Squares);

  // Wait for the animation to finish.
  await Sleep(1000);

  const ElementGameOverOverlay = document.getElementById("play-game-over-container");
  const ElementGameOverOverlayResult = document.getElementById("play-game-over-result");
  let GameOverOverlayResult = "";

  if (Winner === "O") GameOverOverlayResult = "YOU WIN";
  if (Winner === "draw") GameOverOverlayResult = "YOU DRAW";
  if (Winner === "X") GameOverOverlayResult = "YOU LOSE";

  ElementGameOverOverlay.style.display = "flex";
  ElementGameOverOverlayResult.innerText = GameOverOverlayResult;
};

const HandleDrawLineThroughWin = (Squares) => {

  if (Squares === "1-2-3") document.getElementById("play-game-over-line-1").style.display = "block";

  if (Squares === "4-5-6") document.getElementById("play-game-over-line-2").style.display = "block";

  if (Squares === "7-8-9") document.getElementById("play-game-over-line-3").style.display = "block";

  if (Squares === "1-4-7") document.getElementById("play-game-over-line-4").style.display = "block";

  if (Squares === "2-5-8") document.getElementById("play-game-over-line-5").style.display = "block";

  if (Squares === "3-6-9") document.getElementById("play-game-over-line-6").style.display = "block";

  if (Squares === "1-5-9") document.getElementById("play-game-over-line-7").style.display = "block";

  if (Squares === "3-5-7") document.getElementById("play-game-over-line-8").style.display = "block";
};