# DSA Typing Practice

A simple web-based typing test application focused on Data Structures and Algorithms (DSA) topics.

## Features

- Practice typing with DSA-related content.
- Tracks Words Per Minute (WPM) and accuracy.
- Customizable themes and fonts.
- Zen mode for distraction-free typing.
- Toggle lowercase mode for typing exercises.
- Select topics from different DSA categories.

## API Usage

This application fetches typing exercises from the [DSA Typing Practice API](https://dsa-typing-api.onrender.com). As described in the API's documentation (`api/data/README.md`), the key endpoints used are:

- `GET /api/topics`: Fetches the full list of available DSA topics.
- `GET /api/topics/random`: Fetches a random topic for practice.
- `GET /api/categories`: Fetches the list of available categories for topics.

The application uses these endpoints to load typing content dynamically.

## Technologies Used

- HTML
- CSS
- JavaScript
- Fetch API for interacting with the backend.
- `localStorage` for saving user preferences (theme, font, modes).

## Getting Started

To run this application:

1. Clone the repository.
2. Open the `index.html` file in your web browser.

The application should load the typing content from the API automatically.
