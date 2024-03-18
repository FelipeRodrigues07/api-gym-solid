import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from '@/http/controllers/authenticate'
import { profile } from '@/http/controllers/profile'

export async function appRoutes(app: FastifyInstance) {
  app.post('/users', register)

  app.post('/sessions', authenticate) //seção de autnhenticate


    /** Authenticated */ //essas rotas so vai ser chamada se tive autenticada
  app.get('/me', profile)

  
}


//JWT: JSON WEB TOKEN
//usuário faz login, envia e-mail/senha o back-end cria um token único e não modificavel e STATELESS
//STATELESS: Não armazenado em nenhuma estrutura de persistência de dados (banco de dados);
//Back-end: quando vai criar o token ele usa uma palavra chave (string)
//Palavra-chave: gijbrgiohfjgahsijdbiajbidabidbafbaklfbjdabfib
//Email/senha -> header.payload.sign
//Login => JWT
//JWT => Todas as requisições dali para a frente
//Header (cebeçlho): Authorization: Bearer JWT