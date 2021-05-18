import { IUsersRepository } from '../../../data/repositories/IUsersRepository';
import { IValidateCpf } from '../../../data/services/IValidateCpf';
import { IValidateNumberPhone } from '../../../data/services/IValidateNumberPhone';
import { HttpResponse } from '../../../presentation/contracts/http';
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private validateCpf: IValidateCpf,
    private validatePhone: IValidateNumberPhone,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<HttpResponse<ICreateUserResponseDTO>> {
    if (!this.validateCpf.validate(data.cpf)) {
      const response: HttpResponse<ICreateUserResponseDTO> = {
        statusCode: 400,
        data: {
          success: false,
          message: 'Cpf Invalido',
        },
      };

      return response;
    }

    if (!this.validatePhone.validate(data.phone)) {
      const response: HttpResponse<ICreateUserResponseDTO> = {
        statusCode: 400,
        data: {
          success: false,
          message: 'Numero de telefone Invalido',
        },
      };

      return response;
    }

    const userAlreadyExists = await this.usersRepository.findByCpf(data.cpf);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    await this.usersRepository.save(data);

    const response: HttpResponse<ICreateUserResponseDTO> = {
      statusCode: 201,
      data: {
        success: true,
        message: 'User Created',
      },
    };

    return response;
  }
}
