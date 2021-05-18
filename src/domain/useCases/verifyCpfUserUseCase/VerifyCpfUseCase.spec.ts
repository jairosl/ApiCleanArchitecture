import { PhoneNumberValidator } from '../../../data/services/implementations/NumberPhoneValidate';
import { InMemoryUserRepository } from '../../../data/repositories/implementations/InMemoryUserRepository';
import { CpfValidate } from '../../../data/services/implementations/CpfValidate';
import { VerifyCpfUseCase } from './VerifyCpfUseCase';
import { CreateUserUseCase } from '../createUserUseCase/CreateUserUseCase';
import { ICreateUserRequestDTO } from '../createUserUseCase/CreateUserDTO';
import { IVerifyCpfRequest } from './VerifyCpfDTO';

const inMemoryUserRepository = new InMemoryUserRepository();

const mockDB = () => {
  const validateCpf = new CpfValidate();
  const validatePhone = new PhoneNumberValidator();

  const db = new CreateUserUseCase(inMemoryUserRepository, validateCpf, validatePhone);

  return { db, inMemoryUserRepository };
};

const makeSut = () => {
  const sut = new VerifyCpfUseCase(inMemoryUserRepository);

  return { sut };
};

describe('Verify Cpf use cases', () => {
  beforeAll(async () => {
    const { db } = mockDB();

    const dataFaker: ICreateUserRequestDTO = {
      cpf: '08474070473',
      firstName: 'User',
      lastName: 'UserLasName',
      phone: '83999457728',
    };

    await db.execute(dataFaker);
  });

  it('Should be able return a single user by cpf', async () => {
    const { sut } = makeSut();

    const dataFake: IVerifyCpfRequest = {
      cpf: '08474070473',
    };

    const response = await sut.execute(dataFake);

    expect(response.statusCode).toBe(200);
    expect(response.data.user.cpf).toBe('08474070473');
    expect(response.data.success).toBe(true);
    expect(response.data.message).toBe(undefined);
  });

  it('Should not be able return user', async () => {
    const { sut } = makeSut();

    const dataFake: IVerifyCpfRequest = {
      cpf: '11005404402',
    };

    const response = await sut.execute(dataFake);

    expect(response.statusCode).toBe(404);
    expect(response.data.message).toBe('Informações de CPF não armazenadas.');
    expect(response.data.success).toBe(false);
    expect(response.data.user).toBe(undefined);
  });
});
