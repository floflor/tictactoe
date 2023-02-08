
# Tic Tac Toe





## Description

Welcome to my Tic Tac Toe web application! In this game, you can play locally or remotely with a partner. To start a game, simply click on the "Start Game" button located at the center of the screen.

If you choose to play locally, you will need to make two moves in a row, alternating between X and O. But, if you want to play remote, after you Start Game, you'll need to share the unique game ID with your partner, which you can find at the right of the screen.

So, whether you're looking for a solo challenge or a game with friends, this Tic Tac Toe web application has got you covered. Get ready to put your strategy to the test!

## Run Locally

Please make sure to create a new local Postgres Database before trying to compile.

Clone the project

```bash
  git clone https://github.com/floflor/tictactoe.git
```

Go to the project directory

```bash
  cd tictactoe
```
Go to the project client directory

```bash
  cd client
```
Install dependencies

```bash
  npm install
```

Go to the project api directory

```bash
  cd api
```
Install dependencies

```bash
  npm install
```

Start the client 

```bash
  npm start
```
Add env vars to server
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=******
DB_NAME=tictactoe
SERVER_PORT=3001
```
Run migrations
```bash
  npm run db:migration:run
```


Start the server

```bash
  npm start
```



## Tech Stack

**Client:** Typescript, React, SocketIO, Styled-components.

**Server:** Node, Express, SocketIO, TypeORM, PostgreSQL.


## Authors

- [Florencia Almada](https://www.github.com/floflor)

