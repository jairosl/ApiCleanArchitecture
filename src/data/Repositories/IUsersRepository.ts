import { User } from '../../domain/entities/User';

export interface IUsersRepository {
  findByCpf(cpf: string): Promise<User>;
  save(user: User): Promise<User>;
  findById(id: string): Promise<User>;
}
