import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { Prisma, CheckIn } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const startOfTheDay = dayjs(date).startOf('date')//date = dia
    const endOfTheDay = dayjs(date).endOf('date')//ultimo momento valido do dia

    const checkInOnSameDate = this.items.find((checkIn) => {
      const checkInDate = dayjs(checkIn.created_at)
      const isOnSameDate = //se é uma data depois do dia que eu to validando e se ela é anterior ao final do dia 
        checkInDate.isAfter(startOfTheDay) && checkInDate.isBefore(endOfTheDay)

      return checkIn.user_id === userId && isOnSameDate
    })

    if (!checkInOnSameDate) {
      return null
    }

    return checkInOnSameDate
  }


  async findManyByUserId(userId: string, page: number) { //filtrando todos do usuário
    return this.items
      .filter((checkIn) => checkIn.user_id === userId)//filtra chekin pelo usuário
      .slice((page - 1) * 20, page * 20)//
  }


  async countByUserId(userId: string) {
    return this.items.filter((checkIn) => checkIn.user_id === userId).length  //retorna o numero total de chekin do usuário
  }


  async findById(id: string) { //pelo id retorna o check-in relacionado
    const checkIn = this.items.find((item) => item.id === id)

    if (!checkIn) {  //quando não encontra, retorna nulo
      return null
    }

    return checkIn
  }

  async save(checkIn: CheckIn) {//val salva o validated do check-in
    const checkInIndex = this.items.findIndex((item) => item.id === checkIn.id)

    if (checkInIndex >= 0) {//vai atualizar naquel indice específico
      this.items[checkInIndex] = checkIn
    }

    return checkIn
  }



  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date(data.validated_at) : null,
      created_at: new Date(),
    }

    this.items.push(checkIn)

    return checkIn
  }
}