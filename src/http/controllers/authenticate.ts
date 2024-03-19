import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const authenticateUseCase = makeAuthenticateUseCase()

    const { user } = await authenticateUseCase.execute({  //esse caso de uso retorna o user
      email,
      password,
    })


    const token = await reply.jwtSign( //resposta, criar o novo token
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )

    return reply.status(200).send({ //sucesso
      token,
    })



  } catch (err) {
    if (err instanceof InvalidCredentialsError) {  //se for um erro do erro personalizado
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  
}