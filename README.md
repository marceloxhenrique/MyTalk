<div align="center">
	<img src="https://github.com/marceloxhenrique/MyTalk/assets/91223682/60e071d1-0cea-4622-a796-c541c8cfbed2">
</div>

<table align="center" border="0">
  <tr>
    <td style="padding: 10px;" border="0">
      <img src="https://github.com/marceloxhenrique/MyTalk/assets/91223682/deb50483-47ba-4dcc-b27f-164dde8819c9" height="200px">
    </td>
    <td style="padding: 10px;" border="0">
      <img src="https://github.com/marceloxhenrique/MyTalk/assets/91223682/cb5e21d2-f714-482e-8d97-2292466cdad5" height="300px">
    </td>
  </tr>
</table>

# [MyTalk](my-talk-nine.vercel.app)

Mytalk is a lightweight chat web application designed to provide a clear and intuitive communication experience. Get in touch with friends, family, or colleagues in a convenient and user-friendly way.

## Prerequisites

- [NodeJS](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Git](https://git-scm.com/)

# Install and run the App locally

The App is divided in two main folders `Server` and `Client`. Each folder contains its own dependencies.

First, clone the repository

```shell
git clone git@github.com:marceloxhenrique/MyTalk.git
```

## Install Client packages

Navigate to the Client folder and install the necessary packages:

```shell
cd Client
npm install
```

## Setup .env file for Client Environment

Create a .env file in the Client folder with the following content:

```js
VITE_BACKEND_URL_BASE = "http://localhost:3000/api";
VITE_BACKEND_URL_SOCKET = "http://localhost:3000";
VITE_NODE_ENV = "dev";
```

## Install Server Packages

Navigate to the Server folder and install the necessary packages:

```shell
cd ../Server
npm install
```

## Setup .env file for Server Environment

Create a .env file in the Server folder with the following content:

```js
PORT=3000
NODE_ENV=dev
FRONT_END_URL=http://localhost:5173
FRONT_END_URL_PROD=
JWT_TOKEN_SECRET=
JWT_TOKEN_EXPIRATION=

JWT_REFRESH_TOKEN_SECRET=
JWT_REFRESH_TOKEN_EXPIRATION=

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

DB_CONNECTION='postgresql://johndoe:randompassword@localhost:5432/mydb?schema=public'
```

## Setup the database

Run the database migration script to set up the database schema:

```shell
npm run migration
```

## Running Tests

Navigate to the Server folder and use the following command to run the tests:

```shell
npm test
```

This will execute the test scripts defined in the Server folder, checking the functionality and reliability of your server-side code.

## Start the app

Navigate to the Client folder and run:

```shell
npm run dev
```

Open a new terminal window, navigate to the Client folder, and run:

```shell
npm run dev
```

The client application will be available at `http://localhost:5173`.

The server will be running on `http://localhost:3000/api` (or the port specified in your .env file).

## Contribute

If you want to contribute, clone this repo, create your work branch and get your hands dirty!

```shell
git clone git@github.com:marceloxhenrique/MyTalk.git
```

```shell
git checkout -b feature/NAME
```

At the end, open a Pull Request explaining the problem solved or feature made, if exists, append screenshot of visual modifications and wait for the review!
