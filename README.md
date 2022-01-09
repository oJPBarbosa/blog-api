<p align="center">
  <img alt="blog-api-create-post" src="https://user-images.githubusercontent.com/79005271/148666077-691c461d-00bf-4fb0-8d4f-6cc5ae1c6a70.png" />
  <img alt="blog-api-show-posts" src="https://user-images.githubusercontent.com/79005271/148666069-bddf76db-1ac3-4efa-94c0-9c459c99fa18.png" />
</p>

<p align="center">
  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/oJPBarbosa/blog-api.svg">

  <img alt="Repository size" src="https://img.shields.io/github/repo-size/oJPBarbosa/blog-api.svg">
  <a href="https://github.com/oJPBarbosa/blog-api/commits">
    <img alt="GitHub last commit" src="https://img.shields.io/github/last-commit/oJPBarbosa/blog-api.svg">
  </a>
  <img alt="GitHub" src="https://img.shields.io/github/license/oJPBarbosa/blog-api.svg">
  <a href="https://www.codacy.com/gh/oJPBarbosa/blog-api/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=oJPBarbosa/blog-api&amp;utm_campaign=Badge_Grade">
    <img alt="Codacy Badge" src="https://app.codacy.com/project/badge/Grade/06ee3e60480b494e94df3b639567c875">
  </a>
</p>

## 🎯 About

A bilingual blog-needs compliant S.O.L.I.D. principles-based API, that matches nicely with [translate-api](https://github.com/oJPBarbosa/translate-api).

## 🙋 Usage

### Available Endpoints

```
# Users

GET /users
POST /users
POST /users/verify?token=
POST /users/authenticate
POST /users/2fa
POST /users/forgot-password
POST /users/reset-password
PUT /users/:id
DELETE /users/:id

# Posts

GET /posts
POST /posts
POST /posts/view
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
