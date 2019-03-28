# Would You Rather Project

This is the code for the final assessment project for Udacity's React & Redux course.
This is to build a web application that lets  user play the "Would You Rather?" game.
The game goes like this: A user is asked a question in the form: "Would you rather [option
A] or [option B]?". Ansering "neigher or "both" is against the rules.

In the app, users will be able to answer questions, see which questions they haven't answered,
see how other people have voted, post questions, and see the ranking of users on the leaderboard.

The `_DATA.js` file represents a fake database and methods that let you access the data.
Each user should have an avatar, so you’ll need to add the path to each user’s avatar when a new
user is added.

Using the provided starter code, you'll build a React/Redux front end for the application.

The person using the application can impersonate/logging in as an existing user. Information about
the logged-in user (`authedUser`) is displayed on the web page. The application allows the user to
log out and log back in.

If someone tries to navigate anywhere by entering the address in the address bar, the user is asked
to sign in and then the requested page is shown.

Once the user logs in, the user should be able to goggle between his/her answered and unanswered
polls on the home page, which is located at the root (`/`). The polls in both categories are
arranged from the most recently created (top) to the least recently created (bottom).

Each polling question should link to the details of that poll. The details of each poll should
be available at `questions/:question_id`.

When a poll is clicked on the home page (`/`), the webpage shows two options the user has to select.

For answered polls, each of the two options contains the text of the option, number of people who
voted for that option, and percentage of people who voted for that option. The option selected by
the logged-in user is also marked.

The application should show a 404 page if the user is trying to access a poll that does not exist.
It should also display a navigation bar so that the user can easily navigate anywhere in the
application.

Upon voting in a poll, all of the information of an answered poll is displayed. Users can only vote
once per poll. When the user comes back to the home page, the polling question should appear in the
"Answered" column.

A user can post own questions. The form for posting new polling questions is available at the `/add`
route. Upon submitting the form, a new poll should be created, the user should be taken to the home
page, and the new polling question appears in the correct category on the home page.

The application has a leaderboard that's available at the `/leaderboard` route, which shows how many
questions each user has asked and answered. Each entry shows the user's name, picutre and the number
of questions the user asked and the number of questions that the user answered.


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


## Installing and Launching the Application

After cloning the git repo to your local machine, install the required yarn packages.

* Install all project dependencies with
  ```bash
  $ yarn install
  ```
* Install react-redux and redux packages with
  ```bash
  $ yarn add react-redux redux
  ```
* Install redux-thunk package with
  ```bash
  $ yarn add redux-thunk
  ```
* Install react-redux-loading package with
  ```bash
  $ yarn add react-redux-loading
  ```
* Install react-router-dom package with
  ```bash
  $ yarn add react-router-dom
  ```

Then, launch the application with:

  ```bash
  $ yarn start
  ```

The app will be displayed at http://localhost:3000/

## What You're Getting
```bash
├── .gitignore
├── CONTRIBUTING.md
├── README.md # This file.
├── package-lock.json # npm package manager file. It's unlikely that you'll need to modify this.
├── package.json # npm package manager file that lists the packages your project depends on.
├── yarn.lock # yarn package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
│   └── manifest.json
└── src
    └── actions
    │   ├── authedUser.js # action creator with authedUser
    │   ├── questions.js # action creators with questions
    │   ├── shared.js # action creators for data related to both authedUser, users, questions
    │   └── users.js # action creators with users
    └── components
    │   ├── AddQuestion.js # Component to add a new question
    │   ├── App.js # This is the root component for the app. Load the data from the fake server and sets routings for various components
    │   ├── Dashboard.js # Displays Dashboard view for the root page (`/`)
    │   ├── LeaderBoard.js # Displays ranking of users in creating and answering questions
    │   ├── Nav.js # Navigation bar
    │   ├── NoMatch.js # To be invoked when no matching page is found
    │   ├── Question.js # Render a summary question item
    │   ├── QuestionPoll.js # Displays a list of questions for a user to vote and check question poll
    │   ├── SignIn.js # This is where a user signs in
    │   └── SignOut.js # This is how signing out process is done
    └── middleware
    │   ├── index.js # Combined middleware (logger and thunk)
    │   └── logger.js # Middleware for helpful console logging for debugging
    └── reducers
    │   ├── authedUser.js # reducer for operations with authedUser
    │   ├── index.js # root reducer
    │   ├── questions.js # reducer for operations with questions
    │   └── users.js # reducer for operations with users
    └── utils
    │   ├── _DATA.js # A JavaScript API for the provided backend. Instructions for the methods are below.
    │   ├── api.js # Wrapper functions for some functions in _DATA.js
    │   └── helpers.js # Some helpful tools
    ├── index.css # Global styles. Feel free to customize this as you desire.
    ├── index.js # This is the root of your app. Displays the ShowBooks app for the root page (`/`), and the SearchBooks app for the `/search` URL
    └── logo.svg # React logo

```

## Data

There are two types of objects stored in our database:

* Users
* Questions

### Users

Users include:

| Attribute    | Type             | Description           |
|-----------------|------------------|-------------------         |
| id                 | String           | The user’s unique identifier |
| name          | String           | The user’s first name  and last name     |
| avatarURL  | String           | The path to the image file |
| questions | Array | A list of ids of the polling questions this user created|
| answers      | Object         |  The object's keys are the ids of each question this user answered. The value of each key is the answer the user selected. It can be either `'optionOne'` or `'optionTwo'` since each question has two options.

### Questions

Questions include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id                  | String | The question’s unique identifier |
| author        | String | The author’s unique identifier |
| timestamp | String | The time when the question was created|
| optionOne | Object | The first voting option|
| optionTwo | Object | The second voting option|

### Voting Options

Voting options are attached to questions. They include:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| votes             | Array | A list that contains the id of each user who voted for that option|
| text                | String | The text of the option |

Your code will talk to the database via 4 methods:

* `_getUsers()`
* `_getQuestions()`
* `_saveQuestion(question)`
* `_saveQuestionAnswer(object)`

1) `_getUsers()` Method

*Description*: Get all of the existing users from the database.  
*Return Value*: Object where the key is the user’s id and the value is the user object.

2) `_getQuestions()` Method

*Description*: Get all of the existing questions from the database.  
*Return Value*: Object where the key is the question’s id and the value is the question object.

3) `_saveQuestion(question)` Method

*Description*: Save the polling question in the database.  
*Parameters*:  Object that includes the following properties: `author`, `optionOneText`, and `optionTwoText`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| author | String | The id of the user who posted the question|
| optionOneText| String | The text of the first option |
| optionTwoText | String | The text of the second option |

*Return Value*:  An object that has the following properties: `id`, `author`, `optionOne`, `optionTwo`, `timestamp`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| id | String | The id of the question that was posted|
| author | String | The id of the user who posted the question|
| optionOne | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
| optionTwo | Object | The object has a text property and a votes property, which stores an array of the ids of the users who voted for that option|
|timestamp|String | The time when the question was created|

4) `_saveQuestionAnswer(object)` Method

*Description*: Save the answer to a particular polling question in the database.
*Parameters*: Object that contains the following properties: `authedUser`, `qid`, and `answer`. More details about these properties:

| Attribute | Type | Description |
|-----------------|------------------|-------------------|
| authedUser | String | The id of the user who answered the question|
| qid | String | The id of the question that was answered|
| answer | String | The option the user selected. The value should be either `"optionOne"` or `"optionTwo"`|

## Contributing

This repository is the starter code for *all* Udacity students. Therefore, we most likely will not accept pull requests. For details, check out [CONTRIBUTING.md](https://github.com/udacity/reactnd-project-would-you-rather-starter/blob/master/CONTRIBUTING.md).
