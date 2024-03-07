import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}


export class RegisterUseCase {  //cada classe tem um método
  constructor(private usersRepository: UsersRepository) {}   //receber as dependencia dentro do construtor

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

  
    const userWithSameEmail = await this.usersRepository.findByEmail(email) //passa la para o prisma users repository
  

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

                     //recebendo repositorio do construtor
    await this.usersRepository.create({   //cria o usuario no banco de dados
      name,
      email,
      password_hash,
    })
  }
}


//SOLID
//D - Dependency inversion Principable