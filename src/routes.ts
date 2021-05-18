import { Router, Request, Response } from 'express';
import { createUserController } from './domain/useCases/createUserUseCase';
import { verifyCpfController } from './domain/useCases/verifyCpfUserUseCase';

const router = Router();

router.post('/users', (request: Request, response: Response) => createUserController.handle(request, response));
router.get('/cpf/:cpf', (request: Request, response: Response) => verifyCpfController.handle(request, response));

export { router };
