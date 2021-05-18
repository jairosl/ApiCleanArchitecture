import { PostgresUserRepository } from '../../../data/repositories/implementations/PostgresUserRepository';
import { CpfValidate } from '../../../data/services/implementations/CpfValidate';
import { PhoneNumberValidator } from '../../../data/services/implementations/NumberPhoneValidate';
import { CreateUserController } from './CreateUserController';
import { CreateUserUseCase } from './CreateUserUseCase';

const postgresUserRepository = new PostgresUserRepository();

const validateCpf = new CpfValidate();
const validatePhone = new PhoneNumberValidator();

const createUserUseCase = new CreateUserUseCase(postgresUserRepository, validateCpf, validatePhone);

const createUserController = new CreateUserController(createUserUseCase);

export { createUserController };
