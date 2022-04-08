import flask
from flask import Flask

from imdb import search_movies

app = Flask(__name__)

# API Route
@app.route("/endpoint")
def functionname():
    # do stuff
    return {"names": ["Name1", "Name2", "Name3"]}


@app.route("/search", methods=["POST"])
def get_search():
    data = flask.request.get_json()
    query = data["query"]
    movie_results = search_movies(query)

    return movie_results


if __name__ == "__main__":
    app.run(debug=True)
