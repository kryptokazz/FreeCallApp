# 🚀 FreeCallApp: Revolutionize Your Learning Experience! 🧠

## Tech-Powered Learning

- **React:** 🌟 **Smooth, intuitive interface** for seamless interaction.
- **Typescript:** 🔍 **Enhanced code reliability** for a flawless experience.
- **Golang:** 💪 **Robust backend services** for efficient data handling.
- **PostgreSQL:** 🛡️ **Secure, reliable database management**.

## Introduction

Dive into a new era of learning with **FreeCallApp**, inspired by the pioneering memory research of **Professor Robert Allen Bjork**. Tailored for ambitious learners in languages, medicine, law, and more, FreeCallApp is your gateway to mastering complex concepts with ease. 📚✨

## Why Choose FreeCallApp?

- **Free Recall Method:** Leveraging cognitive science for deeper learning. Embrace the power of free recall, validated by **Professor Bjork's research**, to solidify your knowledge beyond simple recognition. 🧠💡
- **Customized Learning Paths:** Designed for you, adapting to your **unique learning style**.🌈
- **Insightful Progress Tracking:** **Monitor your growth** with detailed analytics. 📊

## Our Vision

FreeCallApp transcends traditional learning methods. It's not just an app; it's a movement towards a future where learning is deeply integrated with the science of memory. 🌟

## Join the Learning Revolution

With FreeCallApp, transform the way you learn. Our mission is to make your educational journey not just successful, but also enjoyable and memorable. 🎓🌟

## 🌐 FreeCallApp: Where Advanced Technology Meets Cognitive Science for a Smarter Tomorrow! 🚀🧠

## API Reference

### Base URL

The API is accessible at `http://[hostname]:8080/`. Replace `[hostname]` with the actual server address.

### Endpoints

#### Users
- `GET /users`: Retrieve a list of all users.
- `POST /users`: Create a new user.
- `GET /users/{userId}`: Retrieve a user by ID.
- `PUT /users/{userId}`: Update a user by ID.
- `DELETE /users/{userId}`: Delete a user by ID.

#### Topics
- `GET /topics`: Retrieve all topics.
- `POST /topics`: Create a new topic.
- `GET /topics/{topicId}`: Retrieve a topic by ID.
- `PUT /topics/{topicId}`: Update a topic by ID.
- `DELETE /topics/{topicId}`: Delete a topic by ID.

### Data Models

#### User
```json
{
  "user_id": int,
  "username": "string",
  "profile_name": "string"
}
```

#### Topic
``` json
{
{
  "topic_id": int,
  "topic_name": "string",
  "user_id": int,
  "created_at": "string",
  "updated_at": "string"
}
```

### Getting started

1. Clone the repository 
2. Navigate to the server directory.
3. Ensure you have Go installed and set up
4. Run `go run *.go` to start the server




