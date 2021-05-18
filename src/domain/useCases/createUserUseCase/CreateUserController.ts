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

    const userResponse = await this.createUserUseCase.execute({
      lastName, firstName, cpf, phone,
    });

    return response.status(userResponse.statusCode).json(userResponse.data);
  }
}
