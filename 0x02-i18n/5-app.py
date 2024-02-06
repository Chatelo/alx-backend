#!/usr/bin/env python3
"""A basic Flask application with internationalization (i18n) support.
"""

from flask import Flask, render_template, request, g
from flask_babel import Babel


class Config(object):
    """Configuration class for Flask-Babel.

    Attributes:
        LANGUAGES (list): The languages supported by the application.
        BABEL_DEFAULT_LOCALE (str): The default language.
        BABEL_DEFAULT_TIMEZONE (str): The default timezone.
    """

    LANGUAGES = ["en", "fr"]
    BABEL_DEFAULT_LOCALE = "en"
    BABEL_DEFAULT_TIMEZONE = "UTC"


# configure the flask app
app = Flask(__name__)
app.config.from_object(Config)
app.url_map.strict_slashes = False
babel = Babel(app)


@babel.localeselector
def get_locale():
    """Selects the best language match from the available languages.

    Returns:
        str: The best language match.
    """
    locale = request.args.get("locale")
    if locale and locale in app.config["LANGUAGES"]:
        return locale
    return request.accept_languages.best_match(app.config["LANGUAGES"])


users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}


def get_user():
    """Gets the user from the users dictionary using the 'login_as' parameter.

    Returns:
        dict: The user dictionary if found, otherwise None.
    """
    user_id = request.args.get("login_as")
    if user_id is not None:
        return users.get(int(user_id))
    return None


@app.before_request
def before_request():
    """Executes before all other functions. Sets the global user variable."""
    g.user = get_user()


@app.route("/")
def index():
    """Renders the index page.

    Returns:
        str: The rendered template for the index page.
    """
    return render_template("5-index.html")


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
