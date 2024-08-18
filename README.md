
# Social Media Platform API

This project is an API for a social media platform where users can sign up, log in, create posts, and manage comments on posts, including nested comments (replies). The API is built with Node.js, Express.js, and MongoDB, featuring JWT-based authentication and rate limiting.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
  - [Authentication](#authentication)
  - [Posts](#posts)
  - [Comments](#comments)
- [Request and Response Examples](#request-and-response-examples)
  - [Sign Up](#sign-up)
  - [Login](#login)
  - [Create Post](#create-post)
  - [Create Post Comment](#create-post-comment)
  - [Create Nested Comment](#create-nested-comment)
  - [Get Post Comments](#get-post-comments)
  - [Get Nested Comments](#get-nested-comments)
- [Design Overview](#design-overview)

## Features

- **User Authentication**: Sign up and log in using JWT-based authentication.
- **Post Management**: Create and manage posts.
- **Comment Management**: Comment on posts and reply to existing comments, supporting multi-level nested comments.
- **Rate Limiting**: Prevents abuse by limiting the number of requests from a single IP address.

## Installation

### Run the Application with Docker

To pull and run this application using Docker, follow these steps:

### Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your machine.

### Get started

- Open a terminal.
- Pull the Docker image from Docker Hub:
   ```bash
   docker pull oldmonk05/commentrepo-app:latest
- **Download** the docker-compose.yml File.
- Run the Docker compose
   ```bash
   docker-compose up -d
**At this point you can go to postman and start hitting the apis. Once you are done with the working of apis you may stop the container and remove from your machine.**
- Stop the container
   ``` bash
   docker stop commentrepo-app`
- Remove the container
   ``` bash
   docker rm commentrepo-app`

## API Endpoints

### Authentication

- **POST api/v1/signup**: Register a new user.
- **POST api/v1/login**: Authenticate a user and return a JWT.

### Posts

- **POST api/v1/posts**: Create a new post (requires authentication).

### Comments

- **POST api/v1/posts/:postId/comments**: Add a comment to a post (requires authentication).
- **POST api/v1/posts/:postId/comments/:commentId/reply**: Reply to an existing comment (requires authentication).
- **GET api/v1/posts/:postId/comments**: Retrieve all comments for a specific post (requires authentication).
- **GET api/v1/posts/:postId/comments/:commentId**: Retrieve all replies to a specific comment (requires authentication).

## Request and Response Examples

### Sign Up

**Endpoint:** \`POST /signup\`

**Request Body:**
```json
{
  "name": "john_doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "data": {
    "_id": "user-id",
    "username": "john_doe",
    "email": "john@example.com"
  }
}
```

### Login

**Endpoint:** \`POST /login\`

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully logged in.",
  "token": "jwt-token"
}
```

### Create Post

**Endpoint:** \`POST /posts\`

**Request Body:**
```json
{
  "text": "This is the content of my first post.",
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully created a post",
  "data": {
    "_id": "post-id",
    "userId": "7826562781ag54ta",
    "content": "This is the content of my first post."
  }
}
```


### Create Post Comment

**Rate limiting is while commenting to restrict the number of comments a user can create within a specified time frame.
  here and we have added user in a request so a request object will always have a data about the user who logged in.**
  
**Endpoint:** \`POST /posts/:postId/comments\`

**Request Body:**
```json
{
  "text": "Great post!",
  "postId": "98ab23426562781ag54ta"
}
```


**Response:**
```json
{
  "success": true,
  "message": "Successfully created a comment on a post",
  "data": {
    "_id": "comment-id",
    "text": "Great post!",
    "userId":"56156r6r2avusgujv6",
    "postId": "98ab23426562781ag54ta"
  }
}
```

### Create Nested Comment

**Endpoint:** \`POST /posts/:postId/comments/:commentId/reply\`

**Request Body:**
```json
{
    "postId":"66c0fa07370af11f8937cc56",
    "text":"3rd comment",
    "commentId": "66c0faa8370af11f8937cc77"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully created a comment",
  "data": {
    "_id": "7658ha07x5140af11f8937cc56",
    "text": "Thanks!",
    "userId": "7658ha07370af11f8937cc56",
    "onModel": "Comment",
    "comments": [],
    "postId": "66c0fa07370af11f8937cc56",
    "createdAt": "2024‑08‑15 10:15:57",
    "commentId": "66c0faa8370af11f8937cc77"
  }
}
```

### Get Post Comments

**Endpoint:** \`GET /posts/:postId/comments\`
**Request Body:**
```json
{
    "postId":"66c0fa07370af11f8937cc56",
    "text":"3rd comment",
    "commentId": "66c0faa8370af11f8937cc77"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Successfully fetched comments for a post.",
  "data": [
    {
      "_id": "comment-id",
      "text": "Great post!",
      "userId": "user-id",
      "postId": "post-id",
      "modelType":"Post",
      "parentCommentId":null,
      "totalReplies":4,
      "replies": [
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑15 10:15:58"
        },
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑15 10:15:40"
        },
      ]
    },
    {
      "_id": "comment-id",
      "text": "Great post!",
      "userId": "user-id",
      "postId": "post-id",
      "modelType:"Post",
      "parentCommentId":null,
      "totalReplies":4,
      "replies": [
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑15 10:10:10"
        },
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑15 10:09:57"
        },
      ]
    },
    {
      "_id": "comment-id",
      "text": "Great post!",
      "userId": "user-id",
      "postId": "post-id",
      "modelType":"Post",
      "parentCommentId":null,
      "totalReplies":4,
      "replies": [
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑14 10:15:20"
        },
        {
          "_id": "nested-comment-id",
          "text": "Thanks!",
          "createdAt": "2024‑08‑14 10:10:07"
        },
      ]
    }
  ]
}
```

### Get Nested Comments

**Endpoint:** \`GET /posts/:postId/comments/:commentId\`

**Response:**
```json
{
  "success": true,
  "message": "Successfully expanded a parent comment for a post.",
  "data": [
 {
    "_id": "comment-id",
    "text": "Great post!",
    "userId": "user-id",
    "modelType":"Post",
    "parentCommentId":null,
    "totalReplies":4,
    "postId": "post-id",
    "replies": [
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      },
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      },
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      },
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      }
    ]
  },
  {
    "_id": "comment-id",
    "text": "Great post!",
    "userId": "user-id",
    "modelType":"Post",
    "parentCommentId":null,
    "totalReplies":4,
    "postId": "post-id",
    "replies": [
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      },
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      }
    ]
  },
  {
    "_id": "comment-id",
    "text": "Great post!",
    "userId": "user-id",
    "modelType":"Post",
    "parentCommentId":null,
    "totalReplies":4,
    "postId": "post-id",
    "replies": [
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      },
      {
        "_id": "nested-comment-id",
        "text": "Thanks!",
        "createdAt": "2024‑08‑15 10:15:57"
      }
    ]
  }
 ]
}
```

## Design Overview

### Folder Structure

The project follows a modular structure, separating concerns into distinct folders:

```
.
├── controllers
│   ├── auth-controller.js
│   ├── comment-controller.js
│   └── post-controller.js
├── repository
│   ├── crud-repository.js
│   ├── comment-repository.js
│   └── post-repository.js
|   └── user-repository.js
|   └── index.js
├── middlewares
│   ├── authenticate.js
│   └── rateLimiter.js
├── config
│   ├── database.js
│   └── jwt-middleware.js
├── models
│   ├── User.js
│   ├── Post.js
│   └── Comment.js
├── routes
|   ├── index.js
│   └── v1
|         └──index.js
├── services
│   ├── auth-service.js
│   ├── comment-service.js
│   └── post-service.js
└── app.js
```

### Authentication

- **JWT-Based Authentication**: The API uses \`Passport.js\` with a JWT strategy for securing endpoints. A valid JWT token is required in the \`Authorization\` header for protected routes.

### Rate Limiting

- **Rate Limiting Middleware**: To prevent abuse, rate limiting is applied to key routes, ensuring that the number of requests from a single IP address is controlled.

### Comment Handling

- **Post Comments**: Comments are linked to specific posts and stored in the \`Comment\` model. The API supports commenting directly on posts.
- **Nested Comments**: The API supports multi-level replies to comments, allowing users to create and manage nested comment threads.
- **brief about comment model**: Comment model have commentable, onModel and comments keys which makes this design special. Whenever a comment document gets created we confirm that whether it is a 
post comment of reply to a comment. A key onModel stores on which model this comment have been created (Post/Comment).
