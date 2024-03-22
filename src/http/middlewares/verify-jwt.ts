import { FastifyReply, FastifyRequest } from 'fastify'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    await request.jwtVerify() //busca meu token dentro do header, vai validar se esse token foi reealmente gerado pela nossa aplicação, se não for valida da erro 
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized.' })
  }
}