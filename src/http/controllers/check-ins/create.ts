import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use.case'
import { MaxDistanceError } from '@/use-cases/errors/max-distance-error'
import { MaxNumberOfCheckInsError } from '@/use-cases/errors/max-number-of-check-ins-error'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createCheckInParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckInBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { gymId } = createCheckInParamsSchema.parse(request.params)//vem pelos parametros 
  const { latitude, longitude } = createCheckInBodySchema.parse(request.body)

  try {
    const checkInUseCase = makeCheckInUseCase()

    await checkInUseCase.execute({
      gymId,
      userId: request.user.sub,
      userLatitude: latitude,
      userLongitude: longitude,
    })

    return reply.status(201).send()
  } catch (err) {
    if (err instanceof MaxDistanceError) {  //se for um erro do erro personalizado
      return reply.status(400).send({ message: err.message })
    } else if (err instanceof MaxNumberOfCheckInsError) { // Tratamento para o novo erro personalizado
      return reply.status(400).send({ message: err.message });
    }


    throw err
  }
}