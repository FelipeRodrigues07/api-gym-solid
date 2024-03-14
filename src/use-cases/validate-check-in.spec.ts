import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'
import { expect, describe, it, beforeEach, afterEach,  vi } from 'vitest'
import { ValidateCheckInUseCase } from './validate-check-in'

let checkInsRepository: InMemoryCheckInsRepository
let sut: ValidateCheckInUseCase

describe('Validate Check-in Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new ValidateCheckInUseCase(checkInsRepository)

     vi.useFakeTimers()
  })

  afterEach(() => {
     vi.useRealTimers()
  })

  it('should be able to validate the check-in', async () => {
    const createdCheckIn = await checkInsRepository.create({ //vai criar o check-in
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const { checkIn } = await sut.execute({
      checkInId: createdCheckIn.id,
    })

    expect(checkIn.validated_at).toEqual(expect.any(Date))//que a data de validação seja qualquer date
    expect(checkInsRepository.items[0].validated_at).toEqual(expect.any(Date))//que a data de validação seja preenchida
  })

  it('should not be able to validate an inexistent check-in', async () => {//não posso validar um chekin que não existe
    await expect(() =>
      sut.execute({
        checkInId: 'inexistent-check-in-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to validate the check-in after 20 minutes of its creation', async () => {//não deve ser possivel validar checki depois de 20 mim
    vi.setSystemTime(new Date(2023, 0, 1, 13, 40))//utc-3

    const createdCheckIn = await checkInsRepository.create({
      gym_id: 'gym-01',
      user_id: 'user-01',
    })

    const twentyOneMinutesInMs = 1000 * 60 * 21   //21minutos

    vi.advanceTimersByTime(twentyOneMinutesInMs)//setar essa dada 

    await expect(() =>
      sut.execute({
        checkInId: createdCheckIn.id,
      }),
    ).rejects.toBeInstanceOf(Error)//espero que de erro pois passou de 20 min
  })

})