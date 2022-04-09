from flask import jsonify
import requests
import os
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())
BASE_URL = "https://api.themoviedb.org/3/search/tv"


def search_tv(query):

    query_params = {
        "api_key": os.getenv("TMDB_KEY"),
        "language": "en-US",
        "query": query,
    }

    response = requests.get(BASE_URL, params=query_params)

    data = response.json()

    return jsonify(results=data["results"])
