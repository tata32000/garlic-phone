# Garlic Phone

## Overview

Garlic Phone is a web-based multiplayer game inspired by the popular game "Gartic Phone," but with a unique twist. In Garlic Phone, players create and guess words or sentences instead of drawing pictures. Each round, a player comes up with a word or sentence, and then certain characters from this text are either missing or randomized. The next player must then guess the word and submit their answer. The game is built using Vite, React, TypeScript for the frontend, and Firebase for the backend.

## Features

- **Create Game Rooms:** Players can create game rooms with unique IDs.
- **Join Game Rooms:** Players can join existing game rooms using room IDs.
- **Real-Time Updates:** Game room updates and player lists are synchronized in real-time.
- **Word/Sentence Creation and Guessing:** Players take turns creating and guessing words or sentences with missing or randomized characters.

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (typically installed with Node.js)
- A Firebase project and its configuration details.

## Setting Up

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/tata32000/garlic-phone.git
   cd garlic-phone
   ```

2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Firebase Configuration:**
   - Set up a Firebase project and obtain your Firebase configuration.
   - Create a `.env` file in the root of your project and fill in your Firebase configuration details:

     ```env
     VITE_FIREBASE_API_KEY=your_firebase_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
     VITE_FIREBASE_STORAGE_BUCKET=your_firebase_storage_bucket
     VITE_FIREBASE_MESSAGING_SENDER_ID=your_firebase_messaging_sender_id
     VITE_FIREBASE_APP_ID=your_firebase_app_id
     ```

4. **Running the Application:**
   - To start the development server:

     ```bash
     npm run dev
     ```

   - Open [http://localhost:5173](http://localhost:5173) to view it in the browser.
