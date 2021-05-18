import { IUsersRepository } from '../../../data/Repositories/IUsersRepository';
import { ICreateUserRequestDTO, ICreateUserResponseDTO } from './CreateUserDTO';

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
  ) {}

  async execute(data: ICreateUserRequestDTO): Promise<ICreateUserResponseDTO> {
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
