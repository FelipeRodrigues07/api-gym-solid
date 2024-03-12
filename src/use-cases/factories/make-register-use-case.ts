import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const usersRepository = new PrismaUsersRepository() //istanciar meu repositório
  const registerUseCase = new RegisterUseCase(usersRepository)

  return registerUseCase
}