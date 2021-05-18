import { Request, Response } from 'express';
import { IVerifyCpfRequest } from './VerifyCpfDTO';
import { VerifyCpfUseCase } from './VerifyCpfUseCase';

export class VerifyCpfController {
  constructor(
    private verifyCpfUseCase: VerifyCpfUseCase,
  ) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const {
      cpf,
    } = request.body as IVerifyCpfRequest;

    const verifyCpfResponse = await this.verifyCpfUseCase.execute({ cpf });

    return response.status(verifyCpfResponse.statusCode).json(verifyCpfResponse.data);
  }
}
