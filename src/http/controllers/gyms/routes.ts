import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from '@/http/controllers/gyms/create'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)//todas as rotas que tiver daqui para baixo, vão chamar nosso middlewares, somente usuarios autenticados

    app.post('/create', create)
  }
