import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  await request.jwtVerify()//busca meu token dentro do header, vai validar se esse token foi reealmente gerado pela nossa aplicação, se não for valida da erro 

  // console.log(request.headers)
  console.log(request.user.sub)//ter o id do usuário



  return reply.status(200).send()
}