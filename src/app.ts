import fastify from 'fastify'


import { ZodError } from 'zod'
import { env } from '@/env'
import fastifyJwt from '@fastify/jwt'

import { gymsRoutes } from '@/http/controllers/gyms/routes'
import { usersRoutes } from '@/http/controllers/users/routes'
import { checkInsRoutes } from '@/http/controllers/check-ins/routes'

import fastifyCookie from '@fastify/cookie'//passar o refresh token pelo cokie 

export const app = fastify()


app.register(fastifyJwt, {
  secret: env.JWT_SECRET,  //congigurações palavra secreta
  cookie: {
    cookieName: 'refreshToken',
    signed: false,//que ele não é um cookie assinado
  },
  sign: {
    expiresIn: '1m', //expiração do token original, 10 min
  },
})

app.register(fastifyCookie)

app.register(usersRoutes)
app.register(gymsRoutes)
app.register(checkInsRoutes)

app.setErrorHandler((error, _, reply) => {  //função que lida com erros 
    if (error instanceof ZodError) {  //for de erro de validação
      return reply
        .status(400)
        .send({ message: 'Validation error.', issues: error.format() })
    }
  
    if (env.NODE_ENV !== 'production') { 
      console.error(error)
    } else {
      // TODO: Here we should log to a external tool like DataDog/NewRelic/Sentry
    }
  
    return reply.status(500).send({ message: 'Internal server error.' })
  })