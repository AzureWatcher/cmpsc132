// Inside main.js

// Global variables
let deck = [];
let playerHand = [];
let dealerHand = [];

// Function to start a new game
function startGame() {
    deck = getDeck();
    shuffleDeck(deck);
    playerHand = [drawCard(), drawCard()];
    dealerHand = [drawCard(), drawCard()];
    // Implement the rest of the game logic
}

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