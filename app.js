/*
GAME RULES:
- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game
*/
var scores, roundScore, activePlayer, dice, glamePlaying, prevDice;

init();


document.querySelector('.btn-roll').addEventListener('click', function () {

    if (glamePlaying) {
        // 1.Random Number
        dice = Math.floor(Math.random() * 6) + 1;

        // 2. Display the result
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice' + dice + '.png';
        // document.querySelector('.dice').style.diplay = 'block';
        // document.querySelector('.dice').alt = 'dice-' + dice + '.png';

        // lost score if dice is 6 in a row of 2
        if(prevDice === dice && dice === 6){
            scores[activePlayer] = 0;
            // Update the UI 
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();

        }
        // 3. Update th round score if the rolled number is NOT a 1
        if (dice > 1) {
            //Add score
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
        else {
            //Next player
            // activePlayer === 0? activePlayer = 1: activePlayer = 0;
            // roundScore = 0;

            // //in interface
            // document.getElementById('current-0').textContent = '0';
            // document.getElementById('current-1').textContent = '0';

            // //document.querySelector('.player-0-panel').classList.remove('active');
            // //document.querySelector('.player-1-panel').classList.add('active');

            // document.querySelector('.player-0-panel').classList.toggle('active');
            // document.querySelector('.player-1-panel').classList.toggle('active');
            // document.querySelector('.dice').style.dispaly ='none';
            nextPlayer()

        }
        
        prevDice = dice;
        

    }

});

//anonymous function
document.querySelector('.btn-hold').addEventListener('click', function () {
    if(glamePlaying){
    // Add CURRENT score to players GLOBAL score
    scores[activePlayer] += roundScore;

    // Update the UI 
    document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
    var winningScore = document.querySelector('.winning-score').value

    // Check if player won the game
    if (scores[activePlayer] >= winningScore) {
        document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
        //document.querySelector('.dice').style.diplay = 'none';
        document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
        document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        glamePlaying = false;
    }
    else {

        //Next Player
        nextPlayer();
    }

    }
    
})

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    //in interface
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';

    //document.querySelector('.player-0-panel').classList.remove('active');
    //document.querySelector('.player-1-panel').classList.add('active');

    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
    document.querySelector('.dice').style.dispaly = 'none';
}

document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    glamePlaying = true;
    numOfTimes = 0;

    //object that give access to DOM. # for Id
    //document.querySelector('#current-'+ activePlayer).textContent = dice;
    //document.querySelector('#current-'+ activePlayer).innerHTML = '<em>' +dice +'</em>';
    document.querySelector('.dice').style.dispaly = 'none';
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
}

// 3 Challenges
