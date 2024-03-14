import { GymsRepository, FindManyNearbyParams, } from '@/repositories/gyms-repository'
import { Gym, Prisma } from '@prisma/client'
import { randomUUID } from 'node:crypto'
import { getDistanceBetweenCoordinates } from '@/utils/get-distance-between-coordinates'

export class InMemoryGymsRepository implements GymsRepository {
  public items: Gym[] = []

  async findById(id: string) {
    const gym = this.items.find((item) => item.id === id) //pelo id da academia retorna a gym

    if (!gym) {
      return null
    }

    return gym
    
  }


  async searchMany(query: string, page: number) {  //retorna a academia de acordo com o nome digitado
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20, page * 20)
  }

  
  async findManyNearby(params: FindManyNearbyParams) {  //buscar por academias proximas
    return this.items.filter((item) => { //filtrando minhas listas de academias cadastrada que tão amenos de 10 km de mim
      const distance = getDistanceBetweenCoordinates(
        { latitude: params.latitude, longitude: params.longitude },
        {
          latitude: item.latitude.toNumber(),
          longitude: item.longitude.toNumber(),
        },
      )

      return distance < 10
    })
  }


  async create(data: Prisma.GymCreateInput) {
    const gym = {
      id: data.id ?? randomUUID(),
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      latitude: new Prisma.Decimal(data.latitude.toString()),
      longitude: new Prisma.Decimal(data.longitude.toString()),
      created_at: new Date(),
    }

    this.items.push(gym)

    return gym
  }


}