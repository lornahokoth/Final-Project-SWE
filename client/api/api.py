"""This file is the main file of our flask app that contains our app configurations as well as
routes for our app"""
import os
import flask
from flask import Flask, jsonify

from imdb import search_movies, get_trending_movies, get_movie_detail
from tmdb import get_trending, search_tv, get_tv_detail
from books import search_books, get_book_detail
from nytimes import get_best_sellers
from dbs import Lists, ListItems, db

app = Flask(__name__)

uri = os.getenv("DATABASE_URL")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = uri
# Gets rid of warning
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db.init_app(app)
with app.app_context():
    db.create_all()

# API Route
@app.route("/endpoint")
def index():
    """Test route"""
    # do stuff
    return {"names": ["Name1", "Name2", "Name3"]}


@app.route("/search", methods=["POST"])
def get_search():
    """Return results from IMDB movie search"""
    data = flask.request.get_json()
    query = data["query"]
    movie_results = search_movies(query)

    return movie_results


@app.route("/search1", methods=["POST"])
def get_search1():
    """Returns results from TMDB tv search"""
    data = flask.request.get_json()
    query = data["query"]
    tv_results = search_tv(query)

    return tv_results


@app.route("/search2", methods=["POST"])
def get_search2():
    """Returns results from Google Books search"""
    data = flask.request.get_json()
    query = data["query"]
    book_results = search_books(query)

    return book_results


@app.route("/trending", methods=["GET"])
def trending():
    """Returns data from TMDB trending tv shows"""
    trending_results = get_trending()

    return trending_results


@app.route("/trendingMovies", methods=["GET"])
def trending_movies():
    """Returns results from IMDB trending movies"""
    trending_film = get_trending_movies()
    return trending_film


@app.route("/bestSellers", methods=["GET"])
def best_selling_books():
    """Returns results from NY Times Books API current best sellers"""
    best_books = get_best_sellers()
    return best_books


# DB Calls to Handle Updates to a users Lists
@app.route("/getMyLists", methods=["POST"])
def get_my_lists():
    """Endpoint used to get all lists for a given user"""
    data = flask.request.get_json(force=True)
    my_lists = Lists.get_user_lists(Lists, data["user_id"])
    return jsonify(my_lists)


@app.route("/addNewList", methods=["POST"])
def add_new_list():
    """Endpoint used to add a new list for a user"""
    data = flask.request.get_json(force=True)
    user_id = data["user_id"]
    list_name = data["listName"]
    list_type = data["listType"]
    my_lists = Lists.add_list(Lists, user_id, list_name, list_type, "")
    return jsonify(my_lists)


@app.route("/addNewItem", methods=["POST"])
def add_new_item():
    """Endpoint to add a new entry to a list"""
    data = flask.request.get_json(force=True)
    list_id = data["list_id"]
    media_id = data["media_id"]
    my_item = ListItems.add_list_item(ListItems, list_id, str(media_id))
    return jsonify(my_item)


@app.route("/deleteList", methods=["POST"])
def delete_list():
    """Endpoint to delete a list"""
    data = flask.request.get_json(force=True)
    list_id = data["list_id"]
    ret = Lists.delete_list(Lists, list_id)
    return jsonify(ret)


@app.route("/deleteItem", methods=["POST"])
def delete_item():
    """Endpoint to delete an item from a list"""
    data = flask.request.get_json(force=True)
    item_id = data["item_id"]
    ret = ListItems.delete_list_item(ListItems, item_id)
    return jsonify(ret)


@app.route("/getMovieDetails", methods=["POST"])
def get_movie_details():
    """Endpoint to get details for a given movie"""
    data = flask.request.get_json(force=True)
    media_id = data["media_id"]
    movie_details = get_movie_detail(media_id)

    return movie_details


@app.route("/getTVDetails", methods=["POST"])
def get_tv_details():
    """Endpoint to get ddtails for a given TV show"""
    data = flask.request.get_json(force=True)
    media_id = data["media_id"]
    tv_details = get_tv_detail(str(media_id))

    return tv_details


@app.route("/getBookDetails", methods=["POST"])
def get_book_details():
    """Endpoint to get details for a given book"""
    data = flask.request.get_json(force=True)
    media_id = data["media_id"]
    book_details = get_book_detail(media_id)

    return book_details


if __name__ == "__main__":
    app.run(debug=True)
