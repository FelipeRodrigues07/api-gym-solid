import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'


describe('Register (e2e)', () => {
    beforeAll(async () => {//antes de executar meu app esteja pronto
      await app.ready()
    })
  
    afterAll(async () => {
      await app.close()
    })
  
    it('should be able to register', async () => {
      const response = await request(app.server).post('/users').send({
        name: 'John Bucker',
        email: 'felipe@example.com',
        password: '123456',
      })
  
      expect(response.statusCode).toEqual(201)
    })
  })






// npm i supertest -D  Ele fornece uma abstração para testes de HTTP, permitindo que você faça asserções sobre solicitações HTTP de maneira fácil e fluente. 







