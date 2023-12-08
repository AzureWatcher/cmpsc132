from flask import Flask, render_template, jsonify
import random
app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)



app = Flask(__name__)

#Game Logic
# Initialize deck and hands
deck = []
player_hand = []
dealer_hand = []

# Helper function to calculate hand value
def calculate_hand_value(hand):
    value = sum([10 if card in ['K', 'Q', 'J'] else int(card) for card in hand])
    if 'A' in hand and value + 10 <= 21:
        value += 10
    return value

# Helper function to deal a card
def deal_card():
    card = random.choice(['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'])
    return card

# Start a new round
def new_round():
    global deck, player_hand, dealer_hand
    deck = [deal_card() for _ in range(4)]
    random.shuffle(deck)
    player_hand = [deal_card(), deal_card()]
    dealer_hand = [deal_card(), deal_card()]

# Route to render the HTML template
@app.route('/')
def index():
    return render_template('index.html')

# Endpoint to get the current game state
@app.route('/get_state')
def get_state():
    return jsonify({
        'player_hand': player_hand,
        'dealer_hand': [dealer_hand[0], 'X'],  # Show only the first card of the dealer
        'player_value': calculate_hand_value(player_hand),
        'dealer_value': calculate_hand_value(dealer_hand)
    })

# Endpoint to handle hitting
@app.route('/hit')
def hit():
    player_hand.append(deal_card())
    player_value = calculate_hand_value(player_hand)
    
    if player_value > 21:
        return jsonify({'message': 'Bust! You lose!', 'result': 'lose'})
    elif player_value == 21:
        return jsonify({'message': 'Blackjack! You win!', 'result': 'win'})
    else:
        return jsonify({'message': '', 'result': 'continue'})

# Endpoint to handle standing
@app.route('/stand')
def stand():
    dealer_value = calculate_hand_value(dealer_hand)
    
    while dealer_value < 17:
        dealer_hand.append(deal_card())
        dealer_value = calculate_hand_value(dealer_hand)

    if dealer_value > 21 or dealer_value < calculate_hand_value(player_hand):
        return jsonify({'message': 'You win!', 'result': 'win'})
    elif dealer_value > calculate_hand_value(player_hand):
        return jsonify({'message': 'You lose!', 'result': 'lose'})
    else:
        return jsonify({'message': 'It\'s a draw!', 'result': 'draw'})

# Endpoint to start a new round
@app.route('/deal')
def deal():
    new_round()
    return jsonify({'message': '', 'result': 'continue'})

if __name__ == '__main__':
    app.run(debug=True)
