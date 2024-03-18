import { PrismaCheckInsRepository } from '@/repositories/Prisma/prisma-check-ins-repository'
import { PrismaGymsRepository } from '@/repositories/Prisma/prisma-gyms-repository'
import { CheckInUseCase } from '../check-in'

export function makeCheckInUseCase() {
  const checkInsRepository = new PrismaCheckInsRepository()
  const gymsRepository = new PrismaGymsRepository()

  const useCase = new CheckInUseCase(checkInsRepository, gymsRepository)

  return useCase
}