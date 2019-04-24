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

// true if enemy draws again
// false if enemy stops
function drawChance() {
    var enemyTotal = 0;
    for (var card in enemy) {
        if (enemy.hasOwnProperty(card)) {
            enemyTotal += parseFloat(enemy[card]);
        }
    }
    // get a random integer from 0-total of enemy points
    var chance = Math.floor(Math.random() * enemyTotal);
    if (chance % enemyTotal === 1) { return true; }
    else { return false; }
}

function drawAction(player) {
    // get a random card via random index
    var ind = Math.floor(Math.random() * (deck.length - 1));
    var curCard = player.push(deck.splice(ind, 1));

    if (player === "enemy") {
        enemyScore += curCard[1];
        if (enemyScore > 21) {
            window.alert("Enemy has lost! Over 21");
        }
        else {
            // update number of enemy cards
            document.getElementById("enemy").innerHTML = "Enemy card: " + enemy[0][0] + 
                " and his number of cards: " + enemy.length;
        }
    }
    else {
        handScore += curCard[1];
        if (handScore > 21) {
            window.alert("You have lost! Over 21");
        }
        else {
            // update cards display
            var cardsPlayer = "";
            for (var cards in player) {
                cardsPlayer = cardsPlayer + " " + cards[0] + " " + cards[1];
            }
            document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;
        }
    }
}

function start() {
    // reset and build deck
    deck = [];
    var ind = 0;
    for (var i in suits) {
        for (var j = 1; j <= 10; j++) {
            deck[ind++] = [i + " " +j, j];
        }
        // add jack queen and king
        deck[ind++] = [i+" j", 10];
        deck[ind++] = [i+" q", 10];
        deck[ind++] = [i+" k", 10];
    }

    // deal two cards to players
    drawAction(hand);
    drawAction(enemy);
    drawAction(hand);
    drawAction(enemy);

    // update html
    var cardsPlayer = hand[0][0] + " " + hand[1][0];
    document.getElementById("info").innerHTML = "Your cards: " + cardsPlayer;

    // this never updates as you dont get to see new enemy cards
    var cardsEnemy = enemy[0][0];
    document.getElementById("enemy").innerHTML = "Enemy faceup card: " + cardsEnemy;
}

function stand() {
    // let enemy draw once
    if (drawChance()) {
        drawAction(enemy);
    }

    // game ends whether enemy draws
    if (enemyScore > handScore) {
        document.getElementById("info").innerHTML = "Enemy has won";
        document.getElementById("enemy").innerHTML = "";
    }
    else if (enemyScore < handScore) {
        document.getElementById("info").innerHTML = "You have won!";
        document.getElementById("enemy").innerHTML = "";
    }
    else {
        document.getElementById("info").innerHTML = "Tie game";
        document.getElementById("enemy").innerHTML = "";
    }
}

function hit() {
    drawAction(hand);
    
    if (drawChance()) {
        drawAction(enemy);
    }
}
