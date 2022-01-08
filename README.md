<p align="center">
  <img alt="blog-api-create-post" src="https://user-images.githubusercontent.com/79005271/148644148-61002937-fc40-4dae-97f3-396ee440a7f8.png">
  <img alt="blog-api-show-posts" src="https://user-images.githubusercontent.com/79005271/148644198-b5aac1d2-5b1d-4808-9e6f-f3bf537f1994.png">
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/oJPBarbosa/blog-api.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/oJPBarbosa/blog-api.svg">
  <a href="https://github.com/oJPBarbosa/blog-api/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oJPBarbosa/blog-api.svg">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/oJPBarbosa/blog-api.svg">
  <a href="https://www.codacy.com/gh/oJPBarbosa/blog-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=oJPBarbosa/blog-api&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy Badge" src="">
  </a>
</p>

## 🎯 About

A bilingual blog-needs compliant S.O.L.I.D. principles-based API, that matches nicely with [translate-api](https://github.com/oJPBarbosa/translate-api).

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
DELETE /posts/:id
```

## :rocket: Technologies

- [Node.js](https://nodejs.org/)
- [Express](https://expressjs.com/)
- [S.O.L.I.D.](https://wikipedia.org/wiki/SOLID/)

## ✍️ Author

A project made by [João Pedro Ferreira Barbosa](https://github.com/oJPBarbosa).

## 🌎 License

This project in under MIT license. Check [LICENSE](https://github.com/oJPBarbosa/blog-api/blob/main/LICENSE) for more information.
