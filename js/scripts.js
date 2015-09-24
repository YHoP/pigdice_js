function Player(name){
  this.playerName = name;
  this.turnScore = 0;
  this.gameScore = 0;
}

Player.prototype.resetTurnScore = function(){
  this.turnScore = 0;
}

Player.prototype.increaseTurnScore = function(score){
  this.turnScore = this.turnScore + score;
}

Player.prototype.increaseGameScore = function(score){
  this.gameScore = this.gameScore + score;
}

function Game(playerOneName, playerTwoName){
  this.player1 = new Player(playerOneName);
  this.player2 = new Player(playerTwoName);
  this.currentPlayer = this.player1;
}

Game.prototype.rollDie = function() {
  var roll = Math.floor(Math.random() * 6) + 1;
  this.checkRoll(roll);
  return roll;
}

Game.prototype.checkRoll = function(roll){
  if(roll > 1){
    this.currentPlayer.increaseTurnScore(roll);
  } else {
    this.currentPlayer.resetTurnScore();
    this.nextTurn();
  };
}

Game.prototype.hold = function(){
  this.currentPlayer.increaseGameScore(this.currentPlayer.turnScore);
  this.currentPlayer.resetTurnScore();
  this.nextTurn();
}

Game.prototype.nextTurn = function(){
  if(this.currentPlayer === this.player1){
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
  }
}

Game.prototype.gameStatus = function(){
  if(this.player1.gameScore >= 100) {
    return "Game over, " + this.player1.playerName + " wins.";
  }else if(this.player2.gameScore >= 100){
    return "Game over, " + this.player2.playerName + " wins.";
  }else{
    return "";
  }
}

//jake suggested we need a game score and a turn score...
//because game is played by taking turns, you can opt
//to stop rolling to keep your score, adding it to the
//overall game score.

function clickRollFunction(newGame) {
  var thisRoll = newGame.rollDie();
  var name = newGame.currentPlayer.playerName;
  console.log("current player: "+ name);
  $(".rollscore").html(name + " rolled a "+ thisRoll + ". <br>");
  $(".turnscore").text(name + " score is " + newGame.currentPlayer.turnScore + ".");
  $(".whoseturn").text(name + "'s turn.");
  $(".player1gamescore").text("Total: " + newGame.player1.gameScore);
  $(".player2gamescore").text("Total: " + newGame.player2.gameScore);
  console.log("player2 name: "+ newGame.player2.playerName)
}

function clickHoldFunction(newGame){
  if(newGame.currentPlayer === newGame.player1){
    $("#player1scores").prepend("<tr><td>" + newGame.player1.turnScore + "</td></tr>");
  } else {
    $("#player2scores").prepend("<tr><td>" + newGame.player2.turnScore + "</td></tr>");
  }

  newGame.hold();

  $(".rollscore").text("");
  $(".turnscore").text("");
  $(".whoseturn").text(newGame.currentPlayer.playerName + "'s turn.");
  $(".player1gamescore").text("Total: " + newGame.player1.gameScore);
  $(".player2gamescore").text("Total: " + newGame.player2.gameScore);


  if((newGame.player1.gameScore >= 100) || (newGame.player2.gameScore >= 100)){
    $(".gameover").text(newGame.gameStatus());
    $("#show-contact").hide();
    $("#nextRound").show();
  }
}

function computerPlay(newGame) {
    setTimeout(function () { clickRollFunction(newGame) }, 2000);
    setTimeout(function () { clickRollFunction(newGame) }, 2000);

    setTimeout(function () { clickHoldFunction(newGame) }, 1000);
}

$(document).ready(function() {

  var playerOneName;
  var playerTwoName;
  var newGame;
  $("#nextRound").hide();
  $("#new-game-display").show();

  $("form#new-game").submit(function(event) {
    event.preventDefault();
    playerOneName = $("input#player1").val();
    playerTwoName = $("input#player2").val();
    if(playerTwoName === "") {
      playerTwoName = "Computer";
    }
    newGame = new Game(playerOneName,playerTwoName);

    $("#new-game-display").hide();
    $("#show-contact").show();
    $(".whoseturn").text(newGame.currentPlayer.playerName + "'s turn.");
    $(".player1name").text(playerOneName);
    $(".player2name").text(playerTwoName);
  }); // end of form submit

    $("#roll").click(function() {
      clickRollFunction(newGame);

      if(newGame.currentPlayer.playerName === "Computer") {
        computerPlay(newGame);
      }
    });

    $("#hold").click(function() {
      clickHoldFunction(newGame);
      if(newGame.currentPlayer.playerName === "Computer") {
        computerPlay(newGame);      }
    });

    $("#nextRound").click(function() {
      playerOneName = "";
      playerTwoName = "";
      newGame = undefined;
      $("#nextRound").hide();
      $("#new-game-display").show();
      $(".gameover").hide();

      $("#player1scores").empty();
      $("#player2scores").empty();
      $(".rollscore").empty();
      $(".turnscore").empty();
      $(".whoseturn").empty();
      $(".player1gamescore").empty();
      $(".player2gamescore").empty();

    });
}); // end of document.read
