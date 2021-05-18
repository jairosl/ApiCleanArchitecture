import { PostgresUserRepository } from '../../../data/repositories/implementations/PostgresUserRepository';
import { VerifyCpfController } from './VerifyCpfController';
import { VerifyCpfUseCase } from './VerifyCpfUseCase';

const postgresUserRepository = new PostgresUserRepository();

const verifyCpfUseCase = new VerifyCpfUseCase(postgresUserRepository);

const verifyCpfController = new VerifyCpfController(verifyCpfUseCase);

export { verifyCpfController };
