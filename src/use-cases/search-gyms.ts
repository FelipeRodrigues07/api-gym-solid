import { GymsRepository } from '@/repositories/gyms-repository'
import { Gym } from '@prisma/client'

//buscar academias pelo nome


interface SearchGymsUseCaseRequest {
  query: string  //a busca pelo nome
  page: number  // listar as buscas
}

interface SearchGymsUseCaseResponse {
  gyms: Gym[]
}

export class SearchGymsUseCase {
  constructor(private gymsRepository: GymsRepository) {}

  async execute({
    query,
    page,
  }: SearchGymsUseCaseRequest): Promise<SearchGymsUseCaseResponse> {
    const gyms = await this.gymsRepository.searchMany(query, page)

    return {
      gyms,
    }
  }
}