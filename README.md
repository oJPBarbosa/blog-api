<p align="center">
  <img alt="jpfb-api" src="">
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/oJPBarbosa/jpfb-api.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/oJPBarbosa/jpfb-api.svg">
  <a href="https://github.com/oJPBarbosa/jpfb-api/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oJPBarbosa/jpfb-api.svg">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/oJPBarbosa/jpfb-api.svg">
  <a href="https://www.codacy.com/gh/oJPBarbosa/jpfb-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=oJPBarbosa/jpfb-api&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy Badge" src="">
  </a>
</p>

## 🎯 About

My very own website S.O.L.I.D. principles-based API, developed to handle a blog.

## 🙋 Usage

### Available Endpoints

```
# Users

GET /users
GET /users/verify?token=
POST /users
POST /users/authenticate
POST /users/2fa
POST /users/forgot-password
POST /users/reset-password
PUT /users/:id
DELETE /users/:id

# Posts

GET /posts
POST /posts
PUT /posts/:id
PUT /posts/upvote/:id
PUT /posts/downvote/:id
DELETE /posts/:id
```

## :rocket: Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [S.O.L.I.D.](https://wikipedia.org/wiki/SOLID)

## ✍️ Author

A project made by [João Pedro Ferreira Barbosa](https://github.com/oJPBarbosa).

## 🌎 License

This project in under MIT license. Check [LICENSE](https://github.com/oJPBarbosa/jpfb-api/blob/main/LICENSE) for more information.
