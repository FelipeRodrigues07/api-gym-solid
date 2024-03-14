import { Gym, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}


export interface GymsRepository {
  findById(id: string): Promise<Gym | null>
  create(data: Prisma.GymCreateInput): Promise<Gym>
  searchMany(query: string, page: number): Promise<Gym[]> //buscar pelo nome e retorna a academia
  findManyNearby(params: FindManyNearbyParams): Promise<Gym[]> //método de buscar por academias proximas
}