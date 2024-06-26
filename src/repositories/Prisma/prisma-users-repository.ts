import { prisma } from '@/lib/prisma'
import { Prisma,  User } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {

  async findById(id: string) {
    const user = await prisma.user.findUnique({ //pelo id retorna o usuário
      where: {
        id,
      },
    })

    return user
  }



  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({   // Este comando usa o Prisma para buscar um usuário único no banco de dados onde o campo de e-mail corresponde ao e-mail fornecido.
      where: {
        email,
      },
    })

    return user
  }

  async create(data: Prisma.UserCreateInput) {  //cria no banco de dados
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}