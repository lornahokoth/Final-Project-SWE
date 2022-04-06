from flask import Flask

app = Flask(__name__)

# API Route
@app.route("/endpoint")
def functionname():
    # do stuff
    return {"names": ["Name1", "Name2", "Name3"]}


if __name__ == "__main__":
    app.run(debug=True)
