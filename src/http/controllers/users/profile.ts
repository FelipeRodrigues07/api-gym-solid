import { FastifyReply, FastifyRequest } from 'fastify'
import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-get-user-profile-use.case'

export async function profile(request: FastifyRequest, reply: FastifyReply) {

  // await request.jwtVerify()//busca meu token dentro do header, vai validar se esse token foi reealmente gerado pela nossa aplicação, se não for valida da erro 

  // // console.log(request.headers)
  // console.log(request.user.sub)//ter o id do usuário


  const getUserProfile = makeGetUserProfileUseCase()
  
  const { user } = await getUserProfile.execute({  //pega todos os dados do usuário
    userId: request.user.sub, //ter o id do usuário
  })


  return reply.status(200).send({
    user: {
      ...user,
      password_hash: undefined, //retorna menos isso 
    },
  })
}