Seemly Colloquy
=====================
Danny Fekete

A project based on [Lighthouse Labs](https://www.lighthouselabs.ca/)' Chatty-App assignment.  This was built using the provided [React Simple Boilerplate](https://github.com/lighthouse-labs/react-simple-boilerplate).

!["Name-changing in action"](https://media.giphy.com/media/WvuE4vltyOq2Do5dCl/giphy.gif)
(Or see the full video [here](https://youtu.be/xNkNWXxnZEo).)

!["An ongoing conversation in multiple browser windows."](https://raw.githubusercontent.com/StandardGiraffe/Chatty-App/master/docs/chat-in-progress.png)

### Installation and Startup:
The repository contains both the front-end application in `chatty-app/` and the server in `chatty-app/chatty_server/`.  After cloning the repository, ensure that you install dependencies for both as follows:

```bash
chatty-app/ $ npm i
...
chatty-app/chatty_server $ npm i
```

Once the dependencies have been installed, start both servers simultaneously.

```bash
chatty-app/ $ npm start  // (localhost:3000)
...
chatty-app/chatty_server $ npm start  // (localhost:3001)
```

By default, connect to the client in your browser at: `http://localhost:3000/`


### Usage and Features:
New users will be greeted by the server, and all other connected users will be informed that someone has joined the chat.  Users are assigned a random colour that is (__Fancy Feature__:) reflected in the interface background and their display name.  A live tally of the number of connected users is visible in the upper-right corner of the interface.

By default, new users have no assigned name and will appear to be "Anonymous" when posting.  To change username at any time, type your desired name into the username field and press ENTER to confirm.  (__Fancy Feature__: The username field colours to indicate that uncommited changes are present.)  Upon confirmation, the server will broadcast the change to connected users.

Send a message by typing it into the chat and pressing ENTER.

Upon breaking the connection (here, closing or refreshing the browser tab...), the server broadcasts your departure to any remaining users.

### Dependencies

#### Front-end:
* React
* ReactDOM

#### Back-end:
* Express
* ws
* uuid

#### Dev:
* babel-core
* babel-loader
* babel-preset-es2015
* babel-preset-react
* css-loader
* node-sass
* sass-loader
* sockjs-client
* style-loader
* webpack
* webpack-dev-server

