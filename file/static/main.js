// static/main.js
$(document).ready(function() {
    let deck = [];
    let playerHand = [];
    let dealerHand = [];

    function getDeck() {
        const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
        const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];
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
        playerHand = [drawCard(), drawCard()];
        dealerHand = [drawCard(), drawCard()];

        updateHands();
        $('#start-btn').prop('disabled', true);
        $('#hit-btn').prop('disabled', false);
        $('#stand-btn').prop('disabled', false);
    }

    function updateHands() {
        $('#player-hand').text(`Player Hand: ${formatHand(playerHand)}`);
        $('#dealer-hand').text(`Dealer Hand: ${formatHand([dealerHand[0]])} [Hidden]`);
    }

    function formatHand(hand) {
        return hand.map(card => `${card.rank} of ${card.suit}`).join(', ');
    }

    $('#start-btn').click(function() {
        startGame();
    });

    $('#hit-btn').click(function() {
        playerHand.push(drawCard());
        updateHands();
    });

    $('#stand-btn').click(function() {
        // Implement dealer logic here (draw until 17)
        
        // Update the UI accordingly
        // Determine the winner
    });
    // static/main.js
$(document).ready(function() {
    let deck = [];
    let playerHand = [];
    let dealerHand = [];

    function getDeck() {
        // ... (same as before)
    }

    function shuffleDeck(deck) {
        // ... (same as before)
    }

    function drawCard() {
        // ... (same as before)
    }

    function startGame() {
        playerHand = [drawCard(), drawCard()];
        dealerHand = [drawCard(), drawCard()];

        updateHands();
        $('#start-btn').prop('disabled', true);
        $('#hit-btn').prop('disabled', false);
        $('#stand-btn').prop('disabled', false);
    }

    function updateHands() {
        // ... (same as before)
    }

    function formatHand(hand) {
        // ... (same as before)
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

        // Determine the winner and end the game
        determineWinner();
    }

    function determineWinner() {
        const playerTotal = calculateHandTotal(playerHand);
        const dealerTotal = calculateHandTotal(dealerHand);

        if (playerTotal > 21 || (dealerTotal <= 21 && dealerTotal >= playerTotal)) {
            // Dealer wins
            alert('Dealer Wins!');
        } else {
            // Player wins
            alert('Player Wins!');
        }

        // Reset the game
        $('#start-btn').prop('disabled', false);
        $('#hit-btn').prop('disabled', true);
        $('#stand-btn').prop('disabled', true);
    }

    $('#start-btn').click(function() {
        startGame();
    });

    $('#hit-btn').click(function() {
        playerHand.push(drawCard());
        updateHands();

        const playerTotal = calculateHandTotal(playerHand);
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
    });
});

});
