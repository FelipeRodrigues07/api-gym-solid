//controller de recriar um token de usuário
import { FastifyReply, FastifyRequest } from 'fastify'

export async function refresh(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify({ onlyCookie: true })//vai validar se o usuário está autenticado, mas não vai olhar no autorization , bearer, vai olhar nos cookies da requisição
//com o refresh token válido
//vai gerar um novo token

const { role } = request.user

  const token = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,//dados do usuário logado atualmente
      },
    },
  )

  const refreshToken = await reply.jwtSign(
    { role },
    {
      sign: {
        sub: request.user.sub,
        expiresIn: '7d',
      },
    },
  )

  return reply
    .setCookie('refreshToken', refreshToken, {
      path: '/',
      secure: true,
      sameSite: true,
      httpOnly: true,
    })
    .status(200)
    .send({
      token,
    })
}