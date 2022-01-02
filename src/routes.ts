import { Router } from 'express'

import auth from './middlewares/auth'

import { showUserController } from './usecases/ShowUser'
import { createUserController } from './usecases/CreateUser'
import { authenticateUserController } from './usecases/AuthenticateUser'
import { updateUserController } from './usecases/UpdateUser'
import { deleteUserController } from './usecases/DeleteUser'

import { createPostController } from './usecases/CreatePost'

const router = Router()

router.get('/users/:id', (request, response) => { return showUserController.handle(request, response) })
router.post('/users', (request, response) => { return createUserController.handle(request, response) })
router.post('/users/auth', (request, response) => { return authenticateUserController.handle(request, response) })
router.put('/users/:id', auth, (request, response) => { return updateUserController.handle(request, response) })
router.delete('/users', auth, (request, response) => { return deleteUserController.handle(request, response) })

router.post('/posts', auth, (request, response) => { return createPostController.handle(request, response) })

export default router