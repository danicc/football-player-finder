# Football Player Finder - Challenge

This is a basic app that shows a table of players and a form to apply a filter over this table.

## Running locally

1. clone this repo and then go to the cloned repo folder.
2. run `npm install`
3. run `npm start`

## Runing test

- `npm test`
- `npm run test:coverage`

## Some details

- It was created with `CRA`.
- Use redux to handle a gloabl state of the app. (included `redux-thunk` and `reselect` libraries).
- Use `react-bootrap` for some components.
- Tests made with `jest` and `enzyme`.

## UX

### Player Table

It fetch the players from this [link](https://football-players-b31f2.firebaseio.com/players.json?print=pretty) showing a basic loading message until it get a response. Then it shows a table of players if the response was successful or an error message in the other case.

### Search Form

A simple form that let you filter players over the `PlayerTable`. It won't let you filter players if the input forms are not in a valid state.
