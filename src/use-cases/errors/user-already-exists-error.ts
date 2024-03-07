export class UserAlreadyExistsError extends Error {
    constructor() { //chama o método do erro
      super('E-mail already exists.')
    }
  }