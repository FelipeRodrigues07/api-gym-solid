export class MaxNumberOfCheckInsError extends Error {
    constructor() {
      super('Max number of check-ins reached.')//usuário passou o número maximo de chekins
    }
  }