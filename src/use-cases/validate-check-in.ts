import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { CheckIn } from '@prisma/client'
import dayjs from 'dayjs'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'


//valida check-ins, em academia maiores é digital, ou vai no aplicativo e clica para digitar, integração terceira

interface ValidateCheckInUseCaseRequest {
  checkInId: string
}

interface ValidateCheckInUseCaseResponse {
  checkIn: CheckIn
}

export class ValidateCheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    checkInId,
  }: ValidateCheckInUseCaseRequest): Promise<ValidateCheckInUseCaseResponse> {
    const checkIn = await this.checkInsRepository.findById(checkInId) //pelo check-in id , retorna o check-in relacionado

    if (!checkIn) { 
      throw new ResourceNotFoundError()
    }

                                                 //pega a data atual, retorna diferença entre duas datas
    const distanceInMinutesFromCheckInCreation = dayjs(new Date()).diff( //distancia em minutos desde a criação do chekin
      checkIn.created_at,
      'minutes',
    )

    if (distanceInMinutesFromCheckInCreation > 20) {
      throw new LateCheckInValidationError()
    }



    checkIn.validated_at = new Date()//se ele encontrar o check-in, vai atualizar o validated-at, salva com a data atual

    await this.checkInsRepository.save(checkIn)//vai salvar esse chekin no banco de dados


    

    return {
      checkIn,
    }
  }
}