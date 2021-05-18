import { Request, Response } from 'express';
import { VerifyCpfUseCase } from './VerifyCpfUseCase';

export class VerifyCpfController {
  constructor(
    private verifyCpfUseCase: VerifyCpfUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cpf,
    } = request.params;

    const verifyCpfResponse = await this.verifyCpfUseCase.execute({ cpf });

    return response.status(verifyCpfResponse.statusCode).json(verifyCpfResponse.data);
  }
}
