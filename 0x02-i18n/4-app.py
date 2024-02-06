#!/usr/bin/env python3
"""A basic Flask application with internationalization (i18n) support.
"""

from flask import Flask, render_template, request
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


@app.route("/")
def index():
    """Renders the index page.

    Returns:
        str: The rendered template for the index page.
    """
    return render_template("4-index.html")


if __name__ == "__main__":
    app.run(port="5000", host="0.0.0.0", debug=True)
