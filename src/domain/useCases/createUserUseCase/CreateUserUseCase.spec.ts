import { InMemoryUserRepository } from '../../../data/repositories/implementations/InMemoryUserRepository';
import { CpfValidate } from '../../../data/services/implementations/CpfValidate';
import { PhoneNumberValidator } from '../../../data/services/implementations/NumberPhoneValidate';
import { ValidationError } from '../../errors/ValidatorError';
import { ICreateUserRequestDTO } from './CreateUserDTO';
import { CreateUserUseCase } from './CreateUserUseCase';

const makeSut = () => {
  const validateCpf = new CpfValidate();
  const validatePhone = new PhoneNumberValidator();
  const inMemoryUserRepository = new InMemoryUserRepository();
  const sut = new CreateUserUseCase(inMemoryUserRepository, validateCpf, validatePhone);

  return { sut };
};

describe('Create User use case', () => {
  it('Should be able to create a user', async () => {
    const { sut } = makeSut();

    const dataFaker: ICreateUserRequestDTO = {
      cpf: '117.448.234-64',
      firstName: 'Jairo',
      lastName: 'Lima',
      phone: '83999457728',
    };

    const response = await sut.execute(dataFaker);

    expect(response.statusCode).toBe(201);
    expect(response.data.success).toBe(true);
  });

  it('Should not be able create user and throw error cpf invalid', async () => {
    const { sut } = makeSut();

    const dataFaker: ICreateUserRequestDTO = {
      cpf: '117.448.234.64',
      firstName: 'Jairo',
      lastName: 'Lima',
      phone: '83999457728',
    };

    try {
      await sut.execute(dataFaker);
    } catch (e) {
      expect(e).toEqual(new ValidationError(400, 'Cpf Invalido'));
    }
  });

  it('Should not be able create user and throw error number phone invalid', async () => {
    const { sut } = makeSut();

    const dataFaker: ICreateUserRequestDTO = {
      cpf: '117.448.234-64',
      firstName: 'Jairo',
      lastName: 'Lima',
      phone: '',
    };

    try {
      await sut.execute(dataFaker);
    } catch (e) {
      expect(e).toEqual(new ValidationError(400, 'Numero de telefone Invalido'));
    }
  });

  it('Should not be able create duplicate user and throw error user already exists', async () => {
    const { sut } = makeSut();

    const dataFaker: ICreateUserRequestDTO = {
      cpf: '117.448.234-64',
      firstName: 'Jairo',
      lastName: 'Lima',
      phone: '83999457728',
    };

    try {
      await sut.execute(dataFaker);
      await sut.execute(dataFaker);
    } catch (e) {
      expect(e).toEqual(new ValidationError(400, 'Usuario ja cadastrado'));
    }
  });
});
