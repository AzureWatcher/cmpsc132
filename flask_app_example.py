from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/')
def home():
    return 'Hello, World!'

@app.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        username = request.form['username']
        email = request.form['email']
        # Here you can add the logic to add the user to your database
        return 'User added successfully'
    return render_template('add_user.html')

if __name__ == '__main__':
    app.run(debug=True)