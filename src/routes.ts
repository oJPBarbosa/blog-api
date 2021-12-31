import { Router } from 'express'

import { createUserController } from './useCases/CreateUser'
import { authenticateUserController } from './useCases/AuthenticateUser'
import { deleteUserController } from './useCases/DeleteUser'

const router = Router()

router.post('/users', (request, response) => { return createUserController.handle(request, response) })
router.post('/users/auth', (request, response) => { return authenticateUserController.handle(request, response) })
router.delete('/users', (request, response) => { return deleteUserController.handle(request, response) })

export default router