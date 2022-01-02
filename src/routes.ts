import { Router } from 'express'

import auth from './middlewares/auth'

import { showUserController } from './usecases/User/ShowUser'
import { createUserController } from './usecases/User/CreateUser'
import { authenticateUserController } from './usecases/User/AuthenticateUser'
import { updateUserController } from './usecases/User/UpdateUser'
import { deleteUserController } from './usecases/User/DeleteUser'

import { showPostController } from './usecases/Post/ShowPost'
import { createPostController } from './usecases/Post/CreatePost'
import { updatePostController } from './usecases/Post/UpdatePost'
import { deletePostController } from './usecases/Post/DeletePost'

const router = Router()

router.get('/users/:id', (request, response) => { return showUserController.handle(request, response) })
router.post('/users', (request, response) => { return createUserController.handle(request, response) })
router.post('/users/auth', (request, response) => { return authenticateUserController.handle(request, response) })
router.put('/users/:id', auth, (request, response) => { return updateUserController.handle(request, response) })
router.delete('/users/:id', auth, (request, response) => { return deleteUserController.handle(request, response) })

router.get('/posts/:id', (request, response) => { return showPostController.handle(request, response) })
router.post('/posts', auth, (request, response) => { return createPostController.handle(request, response) })
router.put('/posts/:id', (request, response) => { return updatePostController.handle(request, response) })
router.delete('/posts/:id', auth, (request, response) => { return deletePostController.handle(request, response) })

export default router