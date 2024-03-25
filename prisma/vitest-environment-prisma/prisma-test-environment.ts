// test enviroment consegue mudar variaveis de ambientes apenas para testes especificos
import type { Environment } from 'vitest'

export default <Environment>{
  name: 'custom',
  transformMode: 'ssr',

  async setupVM() { 
    const vm = await import('node:vm')
    const context = vm.createContext()
    return {
      getVmContext() {
        return context
      },
      teardown() {
        
      }
    }
  },
  setup() {//qual código quero executar antes do meus arquivos de teste
    console.log('Setup')
    return {
      teardown() {
       
      }
    }
  }
}

// npm link
//vai criar um pacote local na minha maquina
// npm link vitest-environment-prisma, cria dentro do meu projeto






