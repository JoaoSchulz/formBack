import { compare } from 'bcrypt';
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory'; // Importação corrigida
import { CreateUserUseCase } from './createUserUseCase';

let createUserUseCase: CreateUserUseCase;
let userRepositoryInMemory: UserRepositoryInMemory;

describe('Create User', () => {
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory(); // Instância corrigida
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory);
  });

  it('Should be able to create user', async () => {
    expect(userRepositoryInMemory.users).toEqual([]);

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: '123442',
    });

    const storedUser = userRepositoryInMemory.users[0];
    expect(storedUser.email).toEqual(user.email);
    expect(storedUser.name).toEqual(user.name);
    expect(await compare('123442', storedUser.password)).toBeTruthy(); // Verifica se a senha foi criptografada corretamente
  });

  it('Should be able to create user with a password encrypted', async () => {
    const userPasswordWithoutEncryption = '123123';

    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: userPasswordWithoutEncryption,
    });

    expect(user.password).not.toEqual(userPasswordWithoutEncryption);

    const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password);
    expect(userHasPasswordEncrypted).toBeTruthy();
  });

  it('Should be able to update user password', async () => {
    const user = await createUserUseCase.execute({
      email: 'email@email.com',
      name: 'Vitor',
      password: '123442',
    });

    await userRepositoryInMemory.updateUser(user.id!, { password: 'newpassword123' });

    const updatedUser = userRepositoryInMemory.users.find(u => u.id === user.id);
    expect(updatedUser).toBeDefined();
    expect(await compare('newpassword123', updatedUser!.password)).toBeTruthy();
  });
});