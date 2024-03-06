import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

//para manutenção, vantagem se quiser parar com o prisma

export class PrismaUsersRepository { //operações no banco de dados passa por aqui
  async create(data: Prisma.UserCreateInput) { //tipagens pronta do prisma
    const user = await prisma.user.create({
      data,
    })

    return user
  }
}