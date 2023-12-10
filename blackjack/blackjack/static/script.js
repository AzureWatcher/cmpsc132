document.addEventListener('DOMContentLoaded', function () {
    updateState();

    document.getElementById('hit-btn').addEventListener('click', function () {
        fetch('/hit')
            .then(response => response.json())
            .then(data => {
                updateState();
                alert(data.message);
            });
    });

    document.getElementById('stand-btn').addEventListener('click', function () {
        fetch('/stand')
            .then(response => response.json())
            .then(data => {
                updateState();
                alert(data.message);
            });
    });

    document.getElementById('deal-btn').addEventListener('click', function () {
        fetch('/deal')
            .then(response => response.json())
            .then(data => {
                updateState();
                alert('New round started.');
            });
    });
    function hit() {
    fetch('/hit')
        .then(response => response.json())
        .then(data => {
            updateState();
            alert(data.message);

            // Check if the game is over
            if (data.result !== 'continue') {
                // Optionally, you can disable the "Hit" and "Stand" buttons or take other actions
                document.getElementById('hit-btn').disabled = true;
                document.getElementById('stand-btn').disabled = true;
            }
        });
}
    function updateState() {
        fetch('/get_state')
            .then(response => response.json())
            .then(data => {
                document.getElementById('player-hand').innerText = 'Player Hand: ' + data.player_hand.join(', ');
                document.getElementById('dealer-hand').innerText = 'Dealer Hand: ' + data.dealer_hand.join(', ');
                document.getElementById('result').innerText = 'Result: ' + data.result;
            });
    }
});
