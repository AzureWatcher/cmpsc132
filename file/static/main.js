// Inside main.js

// Global variables
let deck = [];
let playerHand = [];
let dealerHand = [];

// Function to start a new game
function startGame() {
       // Reset hands
       playerHand = [];
       dealerHand = [];
   
       // Get a new shuffled deck
       deck = getDeck();
       shuffleDeck(deck);
   
       // Deal initial cards
       playerHand.push(drawCard());
       dealerHand.push(drawCard());
       playerHand.push(drawCard());
       dealerHand.push(drawCard());
   
       // Display initial game state (you'll need to implement this part)
       displayGameState();
   
       // Implement the rest of the game logic
   }
   
   // Function to display the initial game state
   function displayGameState() {
       // You'll need to update your HTML to display the cards and other game information
       // For simplicity, let's assume you have div elements with IDs 'player-hand' and 'dealer-hand'
          // Update player's hand in the HTML
    $('#player-hand').html(`<strong>Player Hand:</strong> ${formatHand(playerHand)}`);

    // Update dealer's hand in the HTML, only showing the first card
    $('#dealer-hand').html(`<strong>Dealer Hand:</strong> ${formatHand([dealerHand[0]])} [Hidden]`);
}

// Function to format a hand for display
function formatHand(hand) {
    // Create a string representation of the hand
    return hand.map(card => `${card.rank} of ${card.suit}`).join(', ');
   }
   
   // Function to handle user actions (hit, stand, etc.)
   function handleAction(action) {
       // Implement logic for hit, stand, etc.
       //switch(action) {
       // case 'hit':
       //     // Logic for "Hit" action
       //     var newCard = drawCard; // Get a new card
       //     console.log('You got a new card: ' + newCard);
       //     displayGameState(); // Update the player's score
       //     break;
   }
   
   $(document).ready(function() {
       $("#start-btn").click(function() {
           $("#start-btn").hide();
           $("#game-container").show();
           startGame(); // Start the game when the button is clicked
       });
   
       // Implement event listeners for other game actions (hit, stand, etc.)
       // Example: $("#hit-btn").click(function() { handleAction('hit'); });
       document.getElementById('start-btn').addEventListener('click', start_game);
       
       $("#hit-btn").click(function() {
        handleAction('hit');
    });

    $("#stand-btn").click(function() {
        handleAction('stand');
    });

    $("#deal-btn").click(function() {
        handleAction('deal');
    });
});
    // Implement the rest of the game logic


// Function to get a new deck
function getDeck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const ranks = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King', 'Ace'];

    const deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            const card = {
                suit: suit,
                rank: rank
            };
            deck.push(card);
        }
    }

    return deck;
}
    // Implement logic to generate a deck of cards

// main.js

// Function to shuffle the deck
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        // Swap deck[i] and deck[j]
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}
    // Implement logic to shuffle the deck

    //let deck = getDeck();
    //shuffleDeck(deck);


// Function to draw a card from the deck
function drawCard() {
    if (deck.length === 0) {
        // If the deck is empty, create a new one and shuffle
        deck = getDeck();
        shuffleDeck(deck);
    }
    
    // Draw the top card from the deck
    return deck.pop();
    // Implement logic to draw a card from the deck
}