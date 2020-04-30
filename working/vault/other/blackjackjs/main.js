/*
 * Jacky Wong
 * This is a project for GC 3400 at Clemson University.
 * April 26, 2019
 */

var deck = [];
var enemy = [];
var enemyScore = 0;
var hand = [];
var handScore = 0;
var suits = ["c", "d", "h", "s"];

function addPoints(card) {
    if (typeof card === "number")
        return card;
    else
        return 10;
}

// true if enemy draws again
// false if enemy stops
// get a random integer from 0 to enemyScore
// this is intended to make it less likely to draw again if the score is higher
function drawChance() {
    var chance = Math.floor(Math.random() * enemyScore);
    if (chance <= 10) { return true; }
    else { return false; }
}

function drawAction(player) {
    // get a random card via random index
    var ind = Math.floor(Math.random() * (deck.length - 1));
    var newLen = player.push(deck[ind]);
    var valid = true;

    if (player === enemy) {
        enemyScore += addPoints(player[newLen - 1][1]);
        if (enemyScore > 21) {
            window.alert("Enemy has lost! Over 21");
            valid = false;
        }
        // update number of enemy cards
        document.getElementById("enemy").innerHTML = "Enemy faceup card: " + enemy[0] + 
            " || # cards: " + enemy.length;
    }
    else {
        handScore += addPoints(player[newLen - 1][1]);
        if (handScore > 21) {
            window.alert("You have lost! Over 21");
            valid = false;
        }
        // update cards display
        var cardsPlayer = "";
        for (var i = 0; i < hand.length; i++) {
            cardsPlayer = cardsPlayer + hand[i] + " | ";
        }
        document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;
    }
    return valid;
}

function start() {
    // reset and build deck
    deck = [];
    enemy = [];
    enemyScore = 0;
    hand = [];
    handScore = 0;   
    var ind = 0;
    for (var i = 0; i < 4; i++) {
        for (var j = 1; j <= 10; j++) {
            deck[ind++] = [suits[i], j];
        }
        // add jack queen and king
        deck[ind++] = [suits[i], "j"];
        deck[ind++] = [suits[i], "q"];
        deck[ind++] = [suits[i], "k"];
    }

    // deal two cards to players
    drawAction(hand);
    drawAction(enemy);
    drawAction(hand);
    drawAction(enemy);

    // update html
    var cardsPlayer = hand[0] + " | " + hand[1];
    document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;

    // this never updates as you dont get to see new enemy cards
    var cardsEnemy = enemy[0];
    document.getElementById("enemy").innerHTML = "Enemy faceup card: " + 
        cardsEnemy + " || # cards: " + enemy.length;
}

function stand() {
    // let enemy draw once
    if (drawChance() && (enemyScore < handScore)) {
        var eLost = drawAction(enemy);
    }

    // update card info
    var cardsPlayer = "";
    for (var i = 0; i < hand.length; i++) {
        cardsPlayer = cardsPlayer + hand[i] + " | ";
    }
    var cardsEnemy = "";
    for (var i = 0; i < enemy.length; i++) {
        cardsEnemy = cardsEnemy + enemy[i] + " | ";
    }
    document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;
    document.getElementById("enemy").innerHTML = "Enemy cards: " + cardsEnemy;

    if ((enemyScore > handScore) && eLost) {
        alert("Enemy has won with score " + enemyScore);
    }
    else if ((enemyScore < handScore) || !eLost) {
        alert("You have won! With score " + handScore);
    }
    else {
        alert("Tie game! Nobody wins.");
    }
}

function hit() {
    drawAction(hand);
    
    if (drawChance()) {
        drawAction(enemy);
    }
}
