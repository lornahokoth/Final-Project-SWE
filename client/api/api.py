import flask
from flask import Flask

from imdb import search_movies, get_trending_movies
from tmdb import get_trending, search_tv
from books import search_books
from wiki import get_best_sellers

app = Flask(__name__)

# API Route
@app.route("/endpoint")
def index():
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


@app.route("/trending", methods=["GET"])
def trending():
    data = flask.request.get_json()
    trending_results = get_trending()
    # print(trending_results)
    return trending_results


@app.route("/trendingMovies", methods=["GET"])
def trending_movies():
    trending_movies = get_trending_movies()
    return trending_movies


@app.route("/bestSellers", methods=["GET"])
def best_selling_books():
    best_books = get_best_sellers()
    return best_books


if __name__ == "__main__":
    app.run(debug=True)
