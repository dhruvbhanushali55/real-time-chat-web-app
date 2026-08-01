# Real-Time Chat Web App

A lightweight real-time chat web application built with Node.js, Express, Socket.IO and MongoDB (Mongoose). The server serves a static frontend from the `public/` directory and persists chat messages in MongoDB.

Status: Prototype

---

## Quick overview

- Server entry: `server.js`
- Frontend: static files served from `public/` (index.html, script.js, style.css)
- Database: MongoDB via Mongoose (database connection code in `database/db.js`)
- Message model: `models/message.js`
- Start command: `npm start` (runs `node server.js`)

---

## Features

- Real-time one-to-one and group chat via Socket.IO
- Message history persisted to MongoDB
- Presence: online-users list
- Typing indicators
- Simple static client UI (served from `public/`)

---

## Repo layout

- server.js — Express + Socket.IO server
- package.json — project metadata and dependencies
- database/
  - db.js — MongoDB connection helper
- models/
  - message.js — Mongoose schema for messages
- public/
  - index.html — client UI
  - script.js — client-side Socket.IO logic
  - style.css — styles
- .gitignore

---

## Requirements

- Node.js (v16+ recommended)
- npm
- MongoDB (local or remote)

---

## Install & run

1. Clone the repo and install dependencies:

```bash
git clone https://github.com/dhruvbhanushali55/real-time-chat-web-app.git
cd real-time-chat-web-app
npm install