import { FastifyInstance } from 'fastify'

import { verifyJwt } from '@/http/middlewares/verify-jwt'
import { create } from '@/http/controllers/gyms/create'
import { nearby } from '@/http/controllers/gyms/nearby'
import { search } from '@/http/controllers/gyms/search'

export async function gymsRoutes(app: FastifyInstance) {
    app.addHook('onRequest', verifyJwt)//todas as rotas que tiver daqui para baixo, vão chamar nosso middlewares, somente usuarios autenticados

    app.get('/gyms/search', search)
    app.get('/gyms/nearby', nearby)

    app.post('/gyms', create)
  }
