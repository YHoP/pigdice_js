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



$(document).ready(function() {


  $("form#new-game").submit(function(event) {
      event.preventDefault();
      var playerOneName = $("input#player1").val();
      var playerTwoName = $("input#player2").val();
      var newGame = new Game(playerOneName,playerTwoName);

      $("#new-game-display").hide();
      $(".whoseturn").text(newGame.currentPlayer.playerName + "'s turn.'");
      $(".player1name").text(playerOneName);
      $(".player2name").text(playerTwoName);


      $("#roll").click(function() {
        var roll = newGame.rollDie();
        $(".rollscore").text("You rolled a "+ roll + ".");
        $(".turnscore").text("Your score is " + newGame.currentPlayer.turnScore + ".");
        $(".whoseturn").text(newGame.currentPlayer.playerName + "'s turn.");
        $(".player1gamescore").text("Total: " + newGame.player1.gameScore);
        $(".player2gamescore").text("Total: " + newGame.player2.gameScore);



    });

      $("#hold").click(function() {

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
        $(".gameover").text(newGame.gameStatus());


        if((newGame.player1.gameScore >= 100) || (newGame.player2.gameScore >= 100)){
          $("#hold").hide();
          $("#roll").hide();
          $("#new-game-display").show();
        }
    });

  });
});
