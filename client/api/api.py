import flask
from flask import Flask

from imdb import search_movies

app = Flask(__name__)

# API Route
@app.route("/endpoint")
def functionname():
    movie_results = search_movies("narnia")
    print(movie_results)
    # do stuff
    # return movie_results


# @app.route("/query", methods=["POST"])
# def query():
#     data = flask.request.json()
#     return data
functionname()

if __name__ == "__main__":
    app.run(debug=True)
