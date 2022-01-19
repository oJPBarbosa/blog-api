import { Router } from 'express';

import authentication from './middlewares/authentication';

import { showUserController } from './usecases/User/ShowUser';
import { createUserController } from './usecases/User/CreateUser';
import { verifyUserController } from './usecases/User/VerifyUser';
import { authenticateUserController } from './usecases/User/AuthenticateUser';
import { twoFactorAuthenticateUserController } from './usecases/User/TwoFactorAuthenticateUser';
import { forgetUserPasswordController } from './usecases/User/ForgetUserPassword';
import { resetUserPasswordController } from './usecases/User/ResetUserPassword';
import { updateUserController } from './usecases/User/UpdateUser';
import { deleteUserController } from './usecases/User/DeleteUser';

import { showPostController } from './usecases/Post/ShowPost';
import { createPostController } from './usecases/Post/CreatePost';
import { viewPostController } from './usecases/Post/ViewPost';
import { updatePostController } from './usecases/Post/UpdatePost';
import { deletePostController } from './usecases/Post/DeletePost';

import { showCommentController } from './usecases/Comment/ShowComment';
import { createCommentController } from './usecases/Comment/CreateComment';
import { deleteCommentController } from './usecases/Comment/DeleteComment';

const router: Router = Router();

router.get('/users', (request, response) => {
  return showUserController.handle(request, response);
});
router.post('/users', (request, response) => {
  return createUserController.handle(request, response);
});
router.post('/users/verify', (request, response) => {
  verifyUserController.handle(request, response);
});
router.post('/users/authenticate', (request, response) => {
  return authenticateUserController.handle(request, response);
});
router.post('/users/2fa', (request, response) => {
  return twoFactorAuthenticateUserController.handle(request, response);
});
router.post('/users/forgot-password', (request, response) => {
  return forgetUserPasswordController.handle(request, response);
});
router.post('/users/reset-password', (request, response) => {
  return resetUserPasswordController.handle(request, response);
});
router.put('/users/:id', authentication, (request, response) => {
  return updateUserController.handle(request, response);
});
router.delete('/users/:id', authentication, (request, response) => {
  return deleteUserController.handle(request, response);
});

router.get('/posts', (request, response) => {
  return showPostController.handle(request, response);
});
router.post('/posts', authentication, (request, response) => {
  return createPostController.handle(request, response);
});
router.post('/posts/view/:id', (request, response) => {
  return viewPostController.handle(request, response);
});
router.put('/posts/:id', authentication, (request, response) => {
  return updatePostController.handle(request, response);
});
router.delete('/posts/:id', authentication, (request, response) => {
  return deletePostController.handle(request, response);
});

router.get('/posts/comments', (request, response) => {
  return showCommentController.handle(request, response);
});
router.post('/posts/:id/comments', (request, response) => {
  return createCommentController.handle(request, response);
});
router.delete('/posts/comments/:id', authentication, (request, response) => {
  return deleteCommentController.handle(request, response);
});

export default router;
