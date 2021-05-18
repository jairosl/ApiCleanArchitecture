import { IUsersRepository } from '../../../data/repositories/IUsersRepository';
import { IValidateCpf } from '../../../data/services/IValidateCpf';
import { IValidateNumberPhone } from '../../../data/services/IValidateNumberPhone';
import { HttpResponse } from '../../../presentation/contracts/http';
import { ValidationError } from '../../errors/ValidatorError';
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private validateCpf: IValidateCpf,
    private validatePhone: IValidateNumberPhone,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<HttpResponse<ICreateUserResponseDTO>> {
    if (!this.validateCpf.validate(data.cpf)) {
      throw new ValidationError(400, 'Cpf Invalido');
    }

    if (!this.validatePhone.validate(data.phone)) {
      throw new ValidationError(400, 'Numero de telefone Invalido');
    }

    const userAlreadyExists = await this.usersRepository.findByCpf(data.cpf);

    if (userAlreadyExists) {
      throw new ValidationError(400, 'Usuario ja cadastrado');
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
