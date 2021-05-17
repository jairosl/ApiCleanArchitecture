import { Router, Request, Response } from 'express';
import { createUserController } from './domain/useCases/createUserUseCase';

const router = Router();

router.post('/users', (request: Request, response: Response) => createUserController.handle(request, response));

export { router };
