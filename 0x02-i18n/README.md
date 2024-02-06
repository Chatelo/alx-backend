
# 0x02. I18n – Internationalization

This project is about learning and implementing internationalization (i18n) and localization (l10n) in a Flask web application.

## Learning Objectives

-   Learn how to parametrize Flask templates to display different languages
-   Learn how to infer the correct locale based on URL parameters, user settings or request headers
-   Learn how to localize timestamps

## Requirements

-   All files will be interpreted/compiled on Ubuntu 18.04 LTS using python3 (version 3.7)
-   All files should end with a new line
-   A README.md file, at the root of the folder of the project, is mandatory
-   Code should use the pycodestyle style (version 2.5)
-   The first line of all files should be exactly `#!/usr/bin/env python3`
-   All `*.py` files should be executable
-   All modules should have a documentation (`python3 -c 'print(__import__("my_module").__doc__)'`)
-   All classes should have a documentation (`python3 -c 'print(__import__("my_module").MyClass.__doc__)'`)
-   All functions and methods should have a documentation (`python3 -c 'print(__import__("my_module").my_function.__doc__)'` and `python3 -c 'print(__import__("my_module").MyClass.my_function.__doc__)'`)
-   A documentation is not a simple word, it’s a real sentence explaining what’s the purpose of the module, class or method (the length of it will be verified)
-   All functions and coroutines must be type-annotated.

## Tasks

### 0. Basic Flask app

First you will setup a basic Flask app in `0-app.py`. Create a single `/` route and an `index.html` template that simply outputs “Welcome to Holberton” as page title (`<title>`) and “Hello world” as a header (`<h1>`).

### 1. Basic Babel setup

Install the Babel Flask extension:

```sh
$ pip3 install flask_babel==2.0.0

```

Then instantiate the Babel object in your app. Store it in a module-level variable named babel.

In order to configure available languages in our app, you will create a Config class that has a LANGUAGES class attribute equal to [“en”, “fr”].

Use Config to set Babel’s default locale (“en”) and timezone (“UTC”).

Use that class as config for your Flask app.

### 2. Get locale from request

Create a get_locale function with the babel.localeselector decorator. Use request.accept_languages to determine the best match with our supported languages.

### 3. Parametrize templates

Use the _ or gettext function to parametrize your templates. Use the message IDs home_title and home_header.

Create a babel.cfg file containing

```cfg
[python: **.py]
[jinja2: **/templates/**.html]
extensions=jinja2.ext.autoescape,jinja2.ext.with_

```

Then initialize your translations with

```sh
$ pybabel extract -F babel.cfg -o messages.pot .

```

and your two dictionaries with

```sh
$ pybabel init -i messages.pot -d translations -l en
$ pybabel init -i messages.pot -d translations -l fr

```

Then edit files translations/[en|fr]/LC_MESSAGES/messages.po to provide the correct value for each message ID for each language. Use the following translations:

msgid

English

French

home_title

“Welcome to Holberton”

“Bienvenue chez Holberton”

home_header

“Hello world!”

“Bonjour monde!”

Then compile your dictionaries with

```sh
$ pybabel compile -d translations

```

Reload the home page of your app and make sure that the correct messages show up.

### 4. Force locale with URL parameter

In this task, you will implement a way to force a particular locale by passing the locale=fr parameter to your app’s URLs.

In your get_locale function, detect if the incoming request contains locale argument and if its value is a supported locale, return it. If not or if the parameter is not present, resort to the previous default behavior.

Now you should be able to test different translations by visiting http://127.0.0.1:5000?locale=[fr|en].

Visiting http://127.0.0.1:5000/?locale=fr should display this level 1 heading:

### 5. Mock logging in

Creating a user login system is outside the scope of this project. To emulate a similar behavior, copy the following user table in `5-app.py`.

```python
users = {
    1: {"name": "Balou", "locale": "fr", "timezone": "Europe/Paris"},
    2: {"name": "Beyonce", "locale": "en", "timezone": "US/Central"},
    3: {"name": "Spock", "locale": "kg", "timezone": "Vulcan"},
    4: {"name": "Teletubby", "locale": None, "timezone": "Europe/London"},
}

```

This will mock a database user table. Logging in will be mocked by passing login_as URL parameter containing the user ID to log in as.

Define a get_user function that returns a user dictionary or None if the ID cannot be found or if login_as was not passed.

Define a before_request function and use the app.before_request decorator to make it be executed before all other functions. before_request should use get_user to find a user if any, and set it as a global on flask.g.user.

In your HTML template, if a user is logged in, in a paragraph tag, display a welcome message otherwise display a default message as shown in the table below.

msgid

English

French

logged_in_as

“You are logged in as %(username)s.”

“Vous êtes connecté en tant que %(username)s.”

not_logged_in

“You are not logged in.”

“Vous n’êtes pas connecté.”

Visiting http://127.0.0.1:5000/ in your browser should display this:

Visiting http://127.0.0.1:5000/?login_as=2 in your browser should display this:

### 6. Use user locale

Change your get_locale function to use a user’s preferred local if it is supported.

The order of priority should be

-   Locale from URL parameters
-   Locale from user settings
-   Locale from request header
-   Default locale

Test by logging in as different users.

### 7. Infer appropriate time zone

Define a get_timezone function and use the babel.timezoneselector decorator.

The logic should be the same as get_locale:

-   Find timezone parameter in URL parameters
-   Find time zone from user settings
-   Default to UTC

Before returning a URL-provided or user time zone, you must validate that it is a valid time zone. To that, use pytz.timezone and catch the pytz.exceptions.UnknownTimeZoneError exception.

### 8. Display the current time

Based on the inferred time zone, display the current time on the home page in the default format. For example:

Jan 21, 2020, 5:55:39 AM or 21 janv. 2020 à 05:56:28

Use the following translations

msgid

English

French

current_time_is

“The current time is %(current_time)s.”

“Nous sommes le %(current_time)s.”

Displaying the time in French looks like this:

Displaying the time in English looks like this:

## Contributing

When you create a "Contributing" section in your project's README.md file, you are providing guidelines for others who want to contribute to your project, including the process for submitting pull requests. Here's how you can structure the "Contributing" section to explain the process for creating pull requests:

### Creating a Pull Request

1. **Fork the Repository**: Click the "Fork" button at the top right of the repository's page on GitHub. This creates a copy of the project in your GitHub account.

2. **Clone Your Fork**: Clone your forked repository to your local machine using Git.

   ```bash
   git clone https://github.com/yourusername/yourproject.git
   cd yourproject
   ```

3. **Create a Branch**: Create a new branch for your feature or bug fix.

   ```bash
   git checkout -b feature-branch
   ```

4. **Make Changes**: Make your changes and commit them with clear, concise commit messages.

   ```bash
   git add .
   git commit -m "Add a new feature"
   ```

5. **Push to Your Fork**: Push your changes to your fork on GitHub.

   ```bash
   git push origin feature-branch
   ```

6. **Submit a Pull Request**: Go to the original repository on GitHub and click the "New Pull Request" button. Provide a clear title and description of your changes.

7. **Review and Discuss**: Project maintainers or other contributors will review your pull request. Be prepared to answer questions or make further changes.

8. **Merge**: Once your pull request is approved, it will be merged into the main project. Congratulations on your contribution!

### Code Style and Guidelines

Please follow our coding style and guidelines when making changes. For example, we use [coding style guide] and [any other guidelines].

### Issue Tracker

If you find any issues or have ideas for improvements, please open an issue in our [Issue Tracker]. Make sure to check if a similar issue or pull request already exists.

By contributing to this project, you agree to abide by the project's [Code of Conduct].

Thank you for contributing!

## License

This project is under the MIT license.
