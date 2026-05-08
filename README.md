# Hacker News Scraper — MERN Stack Assessment

A full-stack web application built as a technical assessment. It scrapes the top 10 stories from [Hacker News](https://news.ycombinator.com), persists them in MongoDB, and exposes a REST API consumed by a React frontend with authentication and bookmarking features.

---

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Reference](#api-reference)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Future Improvements](#future-improvements)

---

## Overview

The application has three core responsibilities:

1. **Scraping** — On server startup, a Cheerio-based scraper fetches the Hacker News front page and extracts the top 10 stories (title, URL, points, author, posted time), saving them to MongoDB.
2. **API** — An Express REST API handles authentication (register/login via JWT), story retrieval with pagination, and per-user bookmarking.
3. **Frontend** — A React SPA (Vite) consumes the API, managing auth state via Context API with protected and public routing.

---

## Tech Stack

**Backend**

| Package | Purpose |
|---|---|
| Node.js + Express.js | Server and routing |
| MongoDB + Mongoose | Database and ODM |
| JSON Web Tokens (JWT) | Stateless authentication |
| Axios + Cheerio | HTTP fetching and HTML parsing for the scraper |

**Frontend**

| Package | Purpose |
|---|---|
| React (Vite) | UI framework and build tool |
| React Router DOM | Client-side routing |
| Context API | Global authentication state |
| Axios | HTTP client |
| Tailwind CSS | Utility-first styling |

---

## Project Structure

```
root/
├── backend/
│   ├── controllers/        # Route handler logic
│   ├── middleware/         # Auth middleware (JWT verification)
│   ├── models/             # Mongoose schemas (User, Story)
│   ├── routes/             # Express route definitions
│   ├── services/           # Business logic (scraper service)
│   ├── utils/              # Utility helpers
│   ├── .env                # Environment variables (not committed)
│   └── server.js           # App entry point
│
└── frontend/
    ├── src/
    │   ├── api/            # Axios instance configuration
    │   ├── components/     # Reusable UI components
    │   ├── context/        # AuthContext (global auth state)
    │   ├── pages/          # Page-level components
    │   └── main.jsx        # React entry point
    ├── index.html
    └── vite.config.js
```

---

## Features

### Web Scraper

- Scrapes the top 10 stories from Hacker News on server start
- Extracts: title, URL, points, author, and posted time
- Stores results in MongoDB (overwrites stale data on each run)
- Can also be triggered manually via a protected API endpoint

### Authentication

- User registration and login with hashed passwords
- JWT issued on login, verified via middleware on protected routes
- Stateless — no session storage on the server

### Stories

- Retrieve all stories with pagination support
- Stories returned sorted by points in descending order
- Retrieve a single story by ID

### Bookmarks

- Toggle a bookmark on any story (add or remove)
- Bookmarks are stored per user in MongoDB
- Authenticated users can fetch all their bookmarked stories

### Frontend

- Login and Register pages (redirect to home if already authenticated)
- Protected routes (redirect to login if unauthenticated)
- Stories feed on the home page
- Story detail page
- Bookmarks page showing saved stories
- Loading states throughout
- Responsive layout with Tailwind CSS

---

## API Reference

All protected routes require an `Authorization: Bearer <token>` header.

### Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/register` | No | Register a new user |
| POST | `/api/auth/login` | No | Login and receive JWT |

**POST /api/auth/register**
```json
// Request body
{
  "email": "user@example.com",
  "password": "yourpassword"
}

// Response
{
  "token": "<jwt>",
  "user": { "id": "...", "email": "user@example.com" }
}
```

**POST /api/auth/login**
```json
// Request body
{
  "email": "user@example.com",
  "password": "yourpassword"
}

// Response
{
  "token": "<jwt>",
  "user": { "id": "...", "email": "user@example.com" }
}
```

---

### Stories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/api/stories` | Yes | Get all stories (paginated) |
| GET | `/api/stories/:id` | Yes | Get a single story |

**GET /api/stories**

Query parameters: `page` (default: 1), `limit` (default: 10)

```json
// Response
{
  "data": [ { "_id": "...", "title": "...", "url": "...", "points": 312, "author": "user", "postedTime": "3 hours ago" } ],
  "total": 10,
  "page": 1,
  "limit": 10
}
```

---

### Bookmarks

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/bookmarks/:storyId` | Yes | Toggle bookmark on a story |
| GET | `/api/users/bookmarks` | Yes | Get all bookmarked stories |

---

### Scraper

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/api/scrape` | Yes | Manually trigger the scraper |

---

## Getting Started

### Prerequisites

- Node.js v18+
- MongoDB (local instance or MongoDB Atlas URI)

### 1. Clone the repository

```bash
git clone https://github.com/Saurav3004/Hacker_News_Scraper.git
cd Hacker_News_Scraper
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory (see [Environment Variables](#environment-variables) below).

```bash
npm run dev
```

The server starts on `http://localhost:5000` by default. The scraper runs automatically on startup.

### 3. Set up the frontend

```bash
cd frontend
npm install
npm run dev
```

The React app starts on `http://localhost:5173` by default.

---

## Environment Variables

### Backend — `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/
JWT_SECRET=your_jwt_secret_key
```

| Variable | Description |
|---|---|
| `PORT` | Port the Express server listens on |
| `MONGO_URI` | MongoDB connection string (local or Atlas) |
| `JWT_SECRET` | Secret key used to sign and verify JWTs |
| `JWT_EXPIRES_IN` | JWT expiry duration (e.g. `7d`, `24h`) |

### Frontend — `frontend/.env`

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for all API requests from the frontend |

---

## Future Improvements

- **Scheduled scraping** — Replace the single on-startup scrape with a cron job (e.g., every hour) to keep stories fresh without requiring a server restart or manual trigger.
- **Comments support** — Extend the scraper and data model to fetch and display story comments from Hacker News.
- **Search and filtering** — Allow users to search stories by keyword or filter by author and date on the frontend.
- **Refresh token flow** — Introduce refresh tokens for longer sessions without compromising security by extending JWT expiry.
- **Rate limiting** — Add rate limiting on auth endpoints to mitigate brute-force attempts.
- **Unit and integration tests** — Add test coverage for the scraper service, auth flow, and core API endpoints using Jest or Vitest.
- **Deployment** — Containerize with Docker for consistent deployments; deploy backend to Railway or Render and frontend to Vercel.