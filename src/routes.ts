import { Router } from 'express'

import auth from './middlewares/auth'

import { createUserController } from './useCases/CreateUser'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { deleteUserController } from './useCases/DeleteUser'
import { updateUserController } from './useCases/UpdateUser'

const router = Router()

router.post('/users', (request, response) => { return createUserController.handle(request, response) })
router.post('/users/auth', (request, response) => { return authenticateUserController.handle(request, response) })
router.put('/users/:id', auth, (request, response) => { return updateUserController.handle(request, response) })
router.delete('/users', auth, (request, response) => { return deleteUserController.handle(request, response) })

export default router