import { prisma } from '@/lib/prisma'
import { Gym, Prisma } from '@prisma/client'
import { FindManyNearbyParams, GymsRepository } from '../gyms-repository'

export class PrismaGymsRepository implements GymsRepository {
  async findById(id: string) { //pelo id busca uma academia especifica
    const gym = await prisma.gym.findUnique({
      where: {
        id,
      },
    })

    return gym
  }

  //ir para o baixo nível 
  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {  ////método de buscar por academias proximas até 10 km
    const gyms = await prisma.$queryRaw<Gym[]>`
      SELECT * from gyms
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
    `

    return gyms
  }

  async searchMany(query: string, page: number) { //buscar pelo nome e retorna a academia
    const gyms = await prisma.gym.findMany({
      where: {
        title: {
          contains: query, //se o titulo contem a query digitada
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return gyms
  }

  async create(data: Prisma.GymCreateInput) {//criação de academias 
    const gym = await prisma.gym.create({
      data,
    })

    return gym
  }
}