import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
// import { PrismaUsersRepository } from '@/repositories/Prisma/prisma-users-repository'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists-error'

//unit testing - teste unitário



describe('Register Use Case', () => {


    it('should to register', async () => {  //so testar o cadastro
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
    
        const { user } = await registerUseCase.execute({
          name: 'John Doe',
          email: 'johndoe@example.com',
          password: '123456',
        })
    
        expect(user.id).toEqual(expect.any(String))
      })




    it('shoud hash user passsword upon registration', async () => {
        const usersRepository = new InMemoryUsersRepository()//não usa o repository prisma, porque ele so ficticion, pois é teste unitário
        const registerUseCase = new RegisterUseCase(usersRepository)   
              

        const { user} = await registerUseCase.execute({
            name: 'John Doe',
            email: "john@gmail.com",
            password: '123456'
        })

        const isPasswordCorrectlyHashed = await compare(
        '123456',//se for essa senha original que gerou esse hash
        user.password_hash
        )

        expect (isPasswordCorrectlyHashed).toBe(true)
    })




      it('should not be able to register with same email twice', async () => {  //se tem email igual
        const usersRepository = new InMemoryUsersRepository()
        const registerUseCase = new RegisterUseCase(usersRepository)
    
        const email = 'johndoe@example.com'
    
        await registerUseCase.execute({
          name: 'John Doe',
          email,
          password: '123456',
        })
    
        expect(() =>
          registerUseCase.execute({
            name: 'John Doe',
            email,
            password: '123456',
          }),
        ).rejects.toBeInstanceOf(UserAlreadyExistsError)
      })
})