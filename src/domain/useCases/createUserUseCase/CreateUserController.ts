import { Request, Response } from 'express';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      lastName, firstName, cpf, phone,
    } = request.body as ICreateUserRequestDTO;

    try {
      const user = await this.createUserUseCase.execute({
        lastName, firstName, cpf, phone,
      });

      return response.status(201).json(user);
    } catch (err) {
      return response.status(400).json({
        message: err.message || 'Unexpected error!',
      });
    }
  }
}
