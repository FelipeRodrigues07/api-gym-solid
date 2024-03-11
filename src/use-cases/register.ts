import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/user-already-exists-error'
import { User } from '@prisma/client'  //tipagem propria do prisma

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

interface RegisterUseCaseResponse {
  user: User
}



export class RegisterUseCase {  //cada classe tem um método
  constructor(private usersRepository: UsersRepository) {}   //receber as dependencia dentro do construtor
                                                                    //retorna isso
  async execute({ name, email, password }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const password_hash = await hash(password, 6)

   //pega o usário retornado
    const userWithSameEmail = await this.usersRepository.findByEmail(email) //passa la para o prisma users repository
  

    if (userWithSameEmail) { //se o usuario existe
      throw new UserAlreadyExistsError()
    }

                     //recebendo repositorio do construtor
    const user = await this.usersRepository.create({   //cria o usuario no banco de dados
      name,
      email,
      password_hash,
    })

    return {
      user
    }
  }
}


//SOLID
//D - Dependency inversion Principable