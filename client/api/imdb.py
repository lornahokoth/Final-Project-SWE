from flask import jsonify
import requests
import os
from dotenv import find_dotenv, load_dotenv


load_dotenv(find_dotenv())

BASE_URL = "https://imdb-api.com/en/API/SearchMovie"
BASE_URL2 = "https://imdb-api.com/en/API/MostPopularMovies"
IMDB_KEY = os.getenv("IMDB_KEY")


def search_movies(query):
    """Returns title, image, and description of movie results"""

    query_params = {
        "lang": "en",
        "apiKey": IMDB_KEY,
        "expression": query,
    }
    # Creating full url to send requests to
    full_url = BASE_URL + "/" + IMDB_KEY + "/" + query

    response = requests.get(full_url, params=query_params)
    data = response.json()
    # print(data)

    return jsonify(data)


# search_movies("spiderman")


def get_trending_movies():
    new_params = {
        "lang": "en",
        "apiKey": IMDB_KEY,
    }
    new_url = BASE_URL2 + "/" + IMDB_KEY
    # print(new_url)
    response = requests.get(new_url, params=new_params)
    trending_movies = response.json()

    return jsonify(trending_movies)
