import { IUsersRepository } from '../../../data/repositories/IUsersRepository';
import { HttpResponse } from '../../../presentation/contracts/http';
import { IVerifyCpfRequest, IVerifyCpfResponse } from './VerifyCpfDTO';

export class VerifyCpfUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: IVerifyCpfRequest): Promise<HttpResponse<IVerifyCpfResponse>> {
    const { cpf } = data;

    const user = await this.usersRepository.findByCpf(cpf);

    if (!user) {
      const response: HttpResponse<IVerifyCpfResponse> = {
        statusCode: 404,
        data: {
          success: false,
          message: 'Informações de CPF não armazenadas.',
        },
      };

      return response;
    }

    const response: HttpResponse<IVerifyCpfResponse> = {
      statusCode: 200,
      data: {
        success: true,
        user,
      },
    };

    return response;
  }
}
