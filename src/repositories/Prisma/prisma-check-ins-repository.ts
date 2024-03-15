import { prisma } from '@/lib/prisma'
import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn, Prisma } from '@prisma/client'
import dayjs from 'dayjs'

export class PrismaCheckInsRepository implements CheckInsRepository {
  async findById(id: string) {  //pelo id retorna o check-in relacionado
    const checkIn = await prisma.checkIn.findUnique({
      where: {
        id,
      },
    })

    return checkIn
  }

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')
    const endOfTheDay = dayjs(date).endOf('date')//ultimo momento valido do dia

    const checkIn = await prisma.checkIn.findFirst({//encontrar um unico check-in que bata com essas condições
      where: {
        user_id: userId, //de um usuário específico
        created_at: {//entre o começo do dia e do final do dia
          gte: startOfTheDay.toDate(),//buscar por um checkin que tenha sido feito após o começo desse dia
          lte: endOfTheDay.toDate(),// e que a data de de criação seja antes do final do dia
        },
      },
    })

    return checkIn //se tiver retorna
  }

  async findManyByUserId(userId: string, page: number) { //filtrando todos do usuário
    const checkIns = await prisma.checkIn.findMany({ //encontrar vários
      where: {
        user_id: userId, 
      },
      skip: (page - 1) * 20,  //quanto itens quero pular
      take: 20, //trazer 20 itens por página
    })

    return checkIns
  }

  async countByUserId(userId: string) {  //retorna o numero total de chekin do usuário
    const count = await prisma.checkIn.count({
      where: {
        user_id: userId,
      },
    })

    return count
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {  //cria o check-in
    const checkIn = await prisma.checkIn.create({
      data,
    })

    return checkIn //retorna o check-in criado
  }

  async save(data: CheckIn) {//val salva o validated do check-in
    const checkIn = await prisma.checkIn.update({
      where: {
        id: data.id, //id seja igual ao check-in que eu to recebendo aqui
      },
      data, //atualiza esses dados
    })

    return checkIn
  }
}