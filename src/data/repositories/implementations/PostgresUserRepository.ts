import { getManager } from 'typeorm';
import { User } from '../../../domain/entities/User';
import { UserDatabase } from '../../../infra/db/Postgres/entities/UserDatabase';
import { IUsersRepository } from '../IUsersRepository';

export class PostgresUserRepository implements IUsersRepository {
  async findByCpf(cpf: string) {
    const repository = getManager().getRepository(UserDatabase);
    const user = await repository.findOne({ cpf });

    return user;
  }

  async findById(id: string) {
    const repository = getManager().getRepository(UserDatabase);
    const user = repository.findOne({ id });

    return user;
  }

  async save(user: User) {
    const repository = getManager().getRepository(UserDatabase);

    const createUser = repository.create(user);

    await repository.save(createUser);
    return createUser;
  }
}
