import { Router } from 'express'

import auth from './middlewares/auth'

import { showUserController } from './usecases/User/ShowUser'
import { createUserController } from './usecases/User/CreateUser'
import { authenticateUserController } from './usecases/User/AuthenticateUser'
import { twoFactorAuthenticateUserController } from './usecases/User/TwoFactorAuthenticateUser'
import { forgetUserPasswordController } from './usecases/User/ForgetUserPassword'
import { resetUserPasswordController } from './usecases/User/ResetUserPassword'
import { updateUserController } from './usecases/User/UpdateUser'
import { deleteUserController } from './usecases/User/DeleteUser'

import { showPostController } from './usecases/Post/ShowPost'
import { verifyUserController } from './usecases/User/VerifyUser'
import { createPostController } from './usecases/Post/CreatePost'
import { updatePostController } from './usecases/Post/UpdatePost'
import { deletePostController } from './usecases/Post/DeletePost'
import { upvotePostController } from './usecases/Post/UpvotePost'
import { downvotePostController } from './usecases/Post/DownvotePost'

const router: Router = Router()

router.get('/users', (request, response) => { return showUserController.handle(request, response) })
router.get('/users/verify', (request, response) => { verifyUserController.handle(request, response) })
router.post('/users', (request, response) => { return createUserController.handle(request, response) })
router.post('/users/authenticate', (request, response) => { return authenticateUserController.handle(request, response) })
router.post('/users/2fa', (request, response) => { return twoFactorAuthenticateUserController.handle(request, response) })
router.post('/users/forgot-password', (request, response) => { return forgetUserPasswordController.handle(request, response) })
router.post('/users/reset-password', (request, response) => { return resetUserPasswordController.handle(request, response) })
router.put('/users/:id', auth, (request, response) => { return updateUserController.handle(request, response) })
router.delete('/users/:id', auth, (request, response) => { return deleteUserController.handle(request, response) })

router.get('/posts', (request, response) => { return showPostController.handle(request, response) })
router.post('/posts', auth, (request, response) => { return createPostController.handle(request, response) })
router.put('/posts/:id', auth, (request, response) => { return updatePostController.handle(request, response) })
router.put('/posts/upvote/:id', (request, response) => { return upvotePostController.handle(request, response) })
router.put('/posts/downvote/:id', (request, response) => { return downvotePostController.handle(request, response) })
router.delete('/posts/:id', auth, (request, response) => { return deletePostController.handle(request, response) })

export default router