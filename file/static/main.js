// static/main.js
$(document).ready(function() {
    let deck = [];
    let playerHand = [];
    let dealerHand = [];

    function getDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack (10)', 'Queen (10)', 'King (10)', 'Ace'];
        const deck = [];

        for (const suit of suits) {
            for (const rank of ranks) {
                const card = { suit: suit, rank: rank };
                deck.push(card);
            }
        }

        return deck;
    }

    function shuffleDeck(deck) {
        for (let i = deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [deck[i], deck[j]] = [deck[j], deck[i]];
        }
    }

    function drawCard() {
        if (deck.length === 0) {
            deck = getDeck();
            shuffleDeck(deck);
        }
        return deck.pop();
    }

    function startGame() {
        // Reset hands
        playerHand = [];
        dealerHand = [];

        // Deal initial cards to player and dealer
        playerHand.push(drawCard(), drawCard());
        dealerHand.push(drawCard(), drawCard());

        updateHands();
        $('#start-btn').prop('disabled', true);
        $('#hit-btn').prop('disabled', false);
        $('#stand-btn').prop('disabled', false);

        // Reset and display the initial scores
        const playerTotal = 0;
        const dealerTotal = 0;

        // Update the player's score in the UI
        $('#player-score').text('Player Score: ' + playerTotal);

        // Update the dealer's score in the UI
        $('#dealer-score').text('Dealer (CPU) Score: ' + dealerTotal);
    }

    function updateScores() {
        // Calculate the totals
        const playerTotal = calculateHandTotal(playerHand);
        const dealerTotal = calculateHandTotal(dealerHand);
    
        // Update the player's score in the UI
        $('#player-score').text('Player Score: ' + playerTotal);
    
        // Update the dealer's score in the UI
        //$('#dealer-score').text('Dealer (CPU) Score: ' + dealerTotal);
    }

    function updateHands() {
        $('#player-hand').text(`Player Hand: ${formatHand(playerHand)}`);
        $('#dealer-hand').text(`Dealer (CPU) Hand: ${formatHand([dealerHand[0]])} [Hidden]`);

        // Update the scores
        updateScores();
    }

    function formatHand(hand) {
        return hand.map(card => `${card.rank} of ${card.suit}`).join(', ');
    }

    function calculateHandTotal(hand) {
        let total = 0;
        let hasAce = false;

        for (const card of hand) {
            const value = card.rank === 'Ace' ? 11 : (isNaN(card.rank) ? 10 : parseInt(card.rank));
            total += value;

            if (card.rank === 'Ace') {
                hasAce = true;
            }
        }
        // Adjust for Ace if necessary
        if (hasAce && total > 21) {
            total -= 10;
        }

        return total;
    }

    function playDealer() {
        while (calculateHandTotal(dealerHand) < 17) {
            dealerHand.push(drawCard());
        }

        updateHands();

        // Update the dealer's score in the UI
        const dealerTotal = calculateHandTotal(dealerHand);
        $('#dealer-score').text('Dealer (CPU) Score: ' + dealerTotal);

        // Determine the winner and end the game
        determineWinner();
    }

    function determineWinner() {
        const playerTotal = calculateHandTotal(playerHand);
        const dealerTotal = calculateHandTotal(dealerHand);

        //Update the dealer's cards in the UI
        $('#dealer-hand').text(`Dealer (CPU) Hand: ${formatHand(dealerHand)}`);
        if (playerTotal > 21 || (dealerTotal <= 21 && dealerTotal > playerTotal)) {
            // Dealer wins
            alert('Dealer Wins!');
            // Reset the game
            $('#start-btn').prop('disabled', false);
            $('#hit-btn').prop('disabled', true);
            $('#stand-btn').prop('disabled', true);
        } else if (dealerTotal > 21 || playerTotal > dealerTotal) {
            // Player wins
            alert('Player Wins!');
            // Reset the game
            $('#start-btn').prop('disabled', false);
            $('#hit-btn').prop('disabled', true);
            $('#stand-btn').prop('disabled', true);
        } else if (playerTotal === dealerTotal) {
            // It's a tie
            alert('It\'s a tie!');
            // Reset the game
            $('#start-btn').prop('disabled', false);
            $('#hit-btn').prop('disabled', true);
            $('#stand-btn').prop('disabled', true);
        }
    }
    $('#start-btn').click(function() {
        startGame();
    });

    $('#hit-btn').click(function() {
        playerHand.push(drawCard());
        updateHands();
        const playerTotal = calculateHandTotal(playerHand);
        // Update the player's score in the UI
        $('#player-score').text('Player Score: ' + playerTotal);
        if (playerTotal > 21) {
            // Player busts
            alert('Player Busts! Dealer Wins!');
            // Reset the game
            $('#start-btn').prop('disabled', false);
            $('#hit-btn').prop('disabled', true);
            $('#stand-btn').prop('disabled', true);
        }
    
    });

    $('#stand-btn').click(function() {
        $('#hit-btn').prop('disabled', true);
        $('#stand-btn').prop('disabled', true);

        playDealer();
        // Implement dealer logic here (draw until 17)
        // Update the UI accordingly
        // Determine the winner
    });
});
