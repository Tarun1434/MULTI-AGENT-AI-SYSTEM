```md
# Backend Setup Notes

## Why server folder?
Backend code store cheyadaniki.

Backend handles:
- API requests
- AI communication
- database connection
- authentication
- business logic

Frontend direct ga AI/database tho communicate avvadu.
Backend middle layer laga work chestundi.

--------------------------------------------------

# Backend Flow

User → Frontend → Backend → AI API/Database → Frontend

--------------------------------------------------

# Why Node.js?

Node.js JavaScript runtime.

JavaScript ni browser outside run cheyyadaniki use chestham.

### Advantages
- Fast
- Non-blocking
- Same language for frontend & backend
- Good for APIs

--------------------------------------------------

# Why Express.js?

Express = Node.js framework.

Backend APIs easy ga create cheyyadaniki use chestham.

### Advantages
- Simple routing
- Middleware support
- Fast API development
- Clean structure

--------------------------------------------------

# Commands Used

## Create server folder
mkdir server

## Move into server folder
cd server

## Initialize Node project
npm init -y

## Install packages
npm install express cors dotenv axios

--------------------------------------------------

# Why npm init -y ?

Creates:
package.json

Contains:
- project info
- dependencies
- scripts

--------------------------------------------------

# Why We Changed

"type": "commonjs"

to

"type": "module"

Because:
import/export syntax use cheyyadaniki.

Example:
import express from "express";

--------------------------------------------------

# Packages Installed

## express
Node.js framework used to create backend servers and APIs easily.
Helps handle routes, requests, and responses.

---

## cors
Allows frontend and backend to communicate when running on different ports.
Prevents browser blocking cross-origin requests.

---

## dotenv
Used to store secret values like API keys and database URLs securely.
Loads environment variables from the .env file.

---

## axios
Used to send HTTP requests to external APIs.
Helps backend communicate with AI APIs like Groq or OpenAI.
Example:
Groq API
OpenAI API

--------------------------------------------------

# Why Backend Important?

Without backend:
- API keys expose avthai
- database secure ga connect cheyyalem
- authentication impossible
- AI integration difficult

--------------------------------------------------

# server.js

Main backend starting file.

Contains:
- express app
- middleware
- routes
- server port


