import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'
//buscar por academia proximas
interface FetchNearbyGymsUseCaseRequest {
  userLatitude: number  //números do usuário
  userLongitude: number
}

interface FetchNearbyGymsUseCaseResponse {
  gyms: Gym[]
}

export class FetchNearbyGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    userLatitude,
    userLongitude,
  }: FetchNearbyGymsUseCaseRequest): Promise<FetchNearbyGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.findManyNearby({
      latitude: userLatitude,
      longitude: userLongitude,
    })

    return {  //retorna a listas de academias 
      gyms,
    }
  }
}