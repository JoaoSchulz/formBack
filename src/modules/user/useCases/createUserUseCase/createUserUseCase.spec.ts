import { compare } from 'bcrypt'
import { UserRepositoryInMemory } from '../../repositories/UserRepositoryInMemory'
import { CreateUserUseCase } from './createUserUseCase'

let createUserUseCase: CreateUserUseCase
let userRepositoryInMemory: UserRepositoryInMemory

describe('Create User', () =>{
  beforeEach(() => {
    userRepositoryInMemory = new UserRepositoryInMemory()
    createUserUseCase = new CreateUserUseCase(userRepositoryInMemory)
  });

  it("Should be able to create user", async ()=>{
    expect(userRepositoryInMemory.users).toEqual([])

    const user = await createUserUseCase.execute({
      email:"email@email.com",
      name:"Vitor",
      password: "123442",
    });

    // O usuário armazenado terá a senha criptografada, então compare os campos exceto a senha
    const storedUser = userRepositoryInMemory.users[0];
    expect(storedUser.email).toEqual(user.email);
    expect(storedUser.name).toEqual(user.name);
    expect(storedUser.password).toEqual(user.password);
  });

  it("Should be able to create user with a password encrypted", async ()=>{
    const userPasswordWithoutEncryption = "123123"
    
    const user = await createUserUseCase.execute({
      email:"email@email.com",
      name:"Vitor",
      password: userPasswordWithoutEncryption,
    });

    // A senha armazenada deve ser diferente da senha em texto puro
    expect(user.password).not.toEqual(userPasswordWithoutEncryption);

    // A senha criptografada deve corresponder à senha original
    const userHasPasswordEncrypted = await compare(userPasswordWithoutEncryption, user.password)
    expect(userHasPasswordEncrypted).toBeTruthy();
  })

})