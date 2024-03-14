import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {               //devolve o chekin
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>//ver se tem um chekin ja definido de um usuário em determinada data
  findManyByUserId(userId: string, page: number): Promise<CheckIn[]> //devolve uma lista com varios chekins
  countByUserId(userId: string): Promise<number> //devolve o numero total de chekins do usuário
  findById(id: string): Promise<CheckIn | null>//buscar o check-in pelo id
  save(checkIn: CheckIn): Promise<CheckIn>//recebe o chekin que quero cadastrar no banco, e salva no banco, e devolve o proprio check-in
}


//essa tipagem para criar quando o id da gym e do user ja existe