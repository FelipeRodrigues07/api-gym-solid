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
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
        },
      },
    )

    const refreshToken = await reply.jwtSign(//criar o refresh token
      {
        role: user.role,
      },
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',//refresh token expira em 7 dias 
        },
      },
    )

    return reply
      .setCookie('refreshToken', refreshToken, {  //e o refresh token vai enviar pelo cokies
        path: '/',//todo nosso backend pode ver o valor desse cokie 
        secure: true,//vai ser encriptado https
        sameSite: true,//so vai ser acessivel dentro do mesmo dominio, do site
        httpOnly: true,//so vai ser conseguido acessar pelo backend da nossa aplicação
      })
      .status(200)
      .send({
        token,
      })



  } catch (err) {
    if (err instanceof InvalidCredentialsError) {  //se for um erro do erro personalizado
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }


}