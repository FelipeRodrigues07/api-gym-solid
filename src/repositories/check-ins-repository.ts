import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {               //devolve o chekin
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
}


//essa tipagem para criar quando o id da gym e do user ja existe