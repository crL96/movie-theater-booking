# Movie Theater Booking App

## Description

A movie theater booking app built in React.

Currently this is solely a frontend project and a placeholder json-server has been used instead of a dedicated backend REST API.

Users can select (non-occupied seats) and reserve them by filling in their information. An admin page with CRUD functionality exists for admins although no login function is implementet as of right now.

## Getting Started

Live demo: **https://crl96.github.io/movie-theater-booking/**

NOTE: No communication with the API in the live demo due to the usage of a json-server mock api. Run locally for the full experience.

#### Run locally

1. Clone the repository (if you haven't already)

2. Navigate to the directory :

```terminal
cd movie-theater-booking
```

3. Install packages and dependencies:

```terminal
npm install
```

4. Create a .env file in the root directory, look at the .env.sample for clarification.

5. Run Json-server

```terminal
npx json-server db.json
```

6. Run React app in dev server:

```terminal
npm run dev
```

7. Navigate to **http://localhost:5173**

## Technologies Used

Languages: Javascript, HTML/JSX, CSS

Server-side Tools: Json-server

Frontend Tools: React, Vite
