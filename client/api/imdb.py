import requests
import os
from dotenv import find_dotenv, load_dotenv

load_dotenv(find_dotenv())

BASE_URL = "https://imdb-api.com/en/API/SearchMovie"


def search_movies(query):
    """Returns title, image, and description of movie results"""

    query_params = {
        "lang": "en",
        "apiKey": os.getenv("IMDB_KEY"),
        "expression": query,
    }
    # Creating full url to send requests to
    full_url = "/".join([BASE_URL, os.getenv("IMDB_KEY"), query])

    print(full_url)

    response = requests.get(full_url, params=query_params)
    results = response.json()["results"]
    for result in results:
        title = results["title"]

    # for result in results:
    #     title = result["title"]
    #     image = result["image"]
    #     description = result["description"]
    # print(title, image, description)
    # return (title, image, description)
    # movie_results = []
    # for result in results:
    #     movie = []
    #     movie.append(result["title"])
    #     movie.append(result["image"])
    #     movie.append(result["description"])
    #     movie_results.append(movie)
    # print(movie_results)
    # return movie_results

    # def get_movie_titles():
    #     titles = []
    #     for element in details:
    #         titles.append(element["title"])
    #     titles = ", ".join(titles)

    #     print(titles)

    # return titles

    # def get_movie_image():
    #     images = []
    #     for element in details:
    #         images.append(element["image"])
    #     images = ", ".join(images)

    #     print(images)

    # return images

    # return results
    # get_movie_titles()
    # get_movie_image()


# search_movies("narnia")
