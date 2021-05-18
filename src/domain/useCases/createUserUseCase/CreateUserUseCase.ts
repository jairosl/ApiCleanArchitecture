import { IUsersRepository } from '../../../data/repositories/IUsersRepository';
import { IValidateCpf } from '../../../data/services/IValidateCpf';
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private validateCpf: IValidateCpf,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
    if (!this.validateCpf.validate(data.cpf)) {
      const responseCpfInvalid: ICreateUserResponseDTO = {
        success: false,
        message: 'CPF Invalido',
      };
      return responseCpfInvalid;
    }

    const userAlreadyExists = await this.usersRepository.findByCpf(data.cpf);

    if (userAlreadyExists) {
      throw new Error('User already exists');
    }

    const user = await this.usersRepository.save(data);

    const responseJson: ICreateUserResponseDTO = {
      success: !!user,
      message: 'create user',
    };
    return responseJson;
  }
}
