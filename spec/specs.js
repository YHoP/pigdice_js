

describe('rollDie', function() {
  it("returns an integer", function() {
    var testGame = new Game("Jake", "Blake");
    var testRoll = testGame.rollDie();
    expect(isNaN(testRoll)).to.equal(false);
  });

  it("returns an integer between 1-6", function(){
    var testGame = new Game("Jake", "Blake");
    var testRoll = testGame.rollDie();
    expect(1 <= testRoll).to.be.true;
    expect(testRoll <= 6).to.be.true;
  });
});

describe('checkRoll',function() {
  it("returns a zero in turn score when player rolls a 1", function() {
    var testGame = new Game("Jake", "Blake");
    testGame.checkRoll(1);
    expect(testGame.currentPlayer.turnScore).to.equal(0);
  });

  it("adds to turnscore if roll is above 1", function() {
    var testGame = new Game("Jake", "Blake");
    testGame.checkRoll(5);
    expect(testGame.currentPlayer.turnScore).to.equal(5);
  });

  it("adds to turnscore if roll is above 1", function() {
    var testGame = new Game("Jake", "Blake");
    testGame.checkRoll(5);
    testGame.checkRoll(1);
    expect(testGame.currentPlayer.turnScore).to.equal(0);
  });

});

describe('Player', function() {
  it("returns player name and score", function() {
    var testPlayer = new Player("Jake");
    expect(testPlayer.playerName).to.equal("Jake");
    expect(testPlayer.turnScore).to.equal(0);
  });
});

describe('increaseGameScore', function() {
  it("adds turn score to overall game score", function() {
    var testPlayer = new Player("Jake");
    testPlayer.increaseGameScore(5);
    expect(testPlayer.gameScore).to.equal(5);
  });
});

describe('Game', function() {
  it("creates two players with their names", function() {
    var testGame = new Game("Jake", "Blake");
    expect(testGame.player1.playerName).to.equal("Jake");
  });

  it("assigns player 1 to currentPlayer", function() {
    var testGame = new Game("Jake", "Blake");
    expect(testGame.currentPlayer.playerName).to.equal("Jake");
  });


});

describe('nextTurn', function() {
  it("switches current player to the other player", function() {
    var testGame = new Game("Jake", "Blake");
    testGame.nextTurn();
    expect(testGame.currentPlayer.playerName).to.equal("Blake");
  });

  it("switches current player to the other player then back to first player", function() {
    var testGame = new Game("Jake", "Blake");
    testGame.nextTurn();
    testGame.nextTurn();
    expect(testGame.currentPlayer.playerName).to.equal("Jake");
  });

});
