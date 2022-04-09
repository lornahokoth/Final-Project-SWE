import flask
from flask import Flask

from imdb import search_movies
from tmdb import search_tv
from books import search_books

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
    # tv_results = search_tv(query)

    return movie_results


@app.route("/search1", methods=["POST"])
def get_search1():
    data = flask.request.get_json()
    query = data["query"]
    tv_results = search_tv(query)
    # tv_results = search_tv(query)

    return tv_results


@app.route("/search2", methods=["POST"])
def get_search2():
    data = flask.request.get_json()
    query = data["query"]
    book_results = search_books(query)
    # tv_results = search_tv(query)

    return book_results


if __name__ == "__main__":
    app.run(debug=True)

