import random
from flask import Flask, request

class Game:
    def __init__(self):
        self.deck = [i for i in range(1, 12)] * 4
        random.shuffle(self.deck)

    def deal(self):
        return self.deck.pop()
    
app = Flask(__name__)

game = Game()

@app.route('/start')
def start_game():
    card1 = game.deal()
    card2 = game.deal()
    return {'cards': [card1, card2]}