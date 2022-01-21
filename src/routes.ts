import { Router, Request, Response } from 'express';

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

router.get('/users', (request: Request, response: Response) => {
  return showUserController.handle(request, response);
});
router.post('/users', (request: Request, response: Response) => {
  return createUserController.handle(request, response);
});
router.post('/users/verify', (request: Request, response: Response) => {
  verifyUserController.handle(request, response);
});
router.post('/users/authenticate', (request: Request, response: Response) => {
  return authenticateUserController.handle(request, response);
});
router.post('/users/2fa', (request: Request, response: Response) => {
  return twoFactorAuthenticateUserController.handle(request, response);
});
router.post(
  '/users/forgot-password',
  (request: Request, response: Response) => {
    return forgetUserPasswordController.handle(request, response);
  },
);
router.post('/users/reset-password', (request: Request, response: Response) => {
  return resetUserPasswordController.handle(request, response);
});
router.put('/users/:id', authentication, (request, response) => {
  return updateUserController.handle(request, response);
});
router.delete('/users/:id', authentication, (request, response) => {
  return deleteUserController.handle(request, response);
});

router.get('/posts', (request: Request, response: Response) => {
  return showPostController.handle(request, response);
});
router.post('/posts', authentication, (request, response) => {
  return createPostController.handle(request, response);
});
router.post('/posts/view', (request: Request, response: Response) => {
  return viewPostController.handle(request, response);
});
router.put('/posts/:id', authentication, (request, response) => {
  return updatePostController.handle(request, response);
});
router.delete('/posts/:id', authentication, (request, response) => {
  return deletePostController.handle(request, response);
});

router.get('/posts/comments', (request: Request, response: Response) => {
  return showCommentController.handle(request, response);
});
router.post('/posts/:id/comments', (request: Request, response: Response) => {
  return createCommentController.handle(request, response);
});
router.delete('/posts/comments/:id', authentication, (request, response) => {
  return deleteCommentController.handle(request, response);
});

export default router;
