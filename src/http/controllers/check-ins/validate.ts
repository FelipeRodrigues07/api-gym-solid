import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeValidateCheckInUseCase } from '@/use-cases/factories/make-validate-check-in-use-case'
import { LateCheckInValidationError } from '@/use-cases/errors/late-check-in-validation-error'
import { ResourceNotFoundError } from '@/use-cases/errors/resource-not-found-error'

export async function validate(request: FastifyRequest, reply: FastifyReply) {
  const validateCheckInParamsSchema = z.object({
    checkInId: z.string().uuid(),
  })

  const { checkInId } = validateCheckInParamsSchema.parse(request.params)

  try {
    const validateCheckInUseCase = makeValidateCheckInUseCase()

    await validateCheckInUseCase.execute({
      checkInId,
    })

    return reply.status(204).send()//resposta vazia
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {  //se for um erro do erro personalizado
      return reply.status(400).send({ message: err.message })
    } else if (err instanceof LateCheckInValidationError ) { // Tratamento para o novo erro personalizado
      return reply.status(400).send({ message: err.message });
    }


    throw err
  }
}