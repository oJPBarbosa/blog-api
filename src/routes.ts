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

router.get('/users', (request: Request, response: Response) =>
  showUserController.handle(request, response),
);
router.post('/users', (request: Request, response: Response) =>
  createUserController.handle(request, response),
);
router.post('/users/verify', (request: Request, response: Response) => {
  verifyUserController.handle(request, response);
});
router.post('/users/authenticate', (request: Request, response: Response) =>
  authenticateUserController.handle(request, response),
);
router.post('/users/2fa', (request: Request, response: Response) =>
  twoFactorAuthenticateUserController.handle(request, response),
);
router.post('/users/forgot-password', (request: Request, response: Response) =>
  forgetUserPasswordController.handle(request, response),
);
router.post('/users/reset-password', (request: Request, response: Response) =>
  resetUserPasswordController.handle(request, response),
);
router.put('/users/:id', authentication, (request, response) =>
  updateUserController.handle(request, response),
);
router.delete('/users/:id', authentication, (request, response) =>
  deleteUserController.handle(request, response),
);

router.get('/posts', (request: Request, response: Response) =>
  showPostController.handle(request, response),
);
router.post('/posts', authentication, (request, response) =>
  createPostController.handle(request, response),
);
router.post('/posts/view', (request: Request, response: Response) =>
  viewPostController.handle(request, response),
);
router.put('/posts/:id', authentication, (request, response) =>
  updatePostController.handle(request, response),
);
router.delete('/posts/:id', authentication, (request, response) =>
  deletePostController.handle(request, response),
);

router.get('/posts/comments', (request: Request, response: Response) =>
  showCommentController.handle(request, response),
);
router.post('/posts/:id/comments', (request: Request, response: Response) =>
  createCommentController.handle(request, response),
);
router.delete('/posts/comments/:id', authentication, (request, response) =>
  deleteCommentController.handle(request, response),
);

export default router;
