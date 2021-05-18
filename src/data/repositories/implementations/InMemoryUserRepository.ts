import { v4 as uuid } from 'uuid';
import { User } from '../../../domain/entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class InMemoryUserRepository implements IUsersRepository {
  private user: User[] = [];

  async findByCpf(cpf: string) {
    const user = this.user.filter((filter) => filter.cpf === cpf)[0];
    return user;
  }

  async findById(id: string) {
    const user = this.user.filter((filter) => filter.id === id)[0];
    return user;
  }

  async save(user: User) {
    const id = uuid();
    this.user.push({ ...user, id });
    return { ...user, id };
  }
}
