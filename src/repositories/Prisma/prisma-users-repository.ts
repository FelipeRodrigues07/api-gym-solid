import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

import { UsersRepository } from '../users-repository'

export class PrismaUsersRepository implements UsersRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({   //se o email ja existe
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