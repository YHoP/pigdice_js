function Player(name){
  this.playerName = name;
  this.turnScore = 0;
  this.gameScore = 0;
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

Game.prototype.nextTurn = function(){
  if(this.currentPlayer === this.player1){
    this.currentPlayer = this.player2;
  } else {
    this.currentPlayer = this.player1;
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
      var currentplayer = newGame.player1;

      $(".player1name").text(playerOneName);
      $(".player2name").text(playerTwoName);


      $("#roll").click(function() {
        var rollValue = currentPlayer.rollDie();


    });

  });
});
