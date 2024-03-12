import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {               //devolve o chekin
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByUserIdOnDate(userId: string, date: Date): Promise<CheckIn | null>//ver se tem um chekin ja definido de um usuário em determinada data
}


//essa tipagem para criar quando o id da gym e do user ja existe