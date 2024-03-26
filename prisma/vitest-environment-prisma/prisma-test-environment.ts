// test enviroment consegue mudar variaveis de ambientes apenas para testes especificos
//configurar para banco de dados
import type { Environment } from 'vitest'

//DATABASE_URL="postgresql://docker:docker@localhost:5432/apisolid?schema=public"   substitui esse schema

import 'dotenv/config'

import { randomUUID } from 'node:crypto'
import { execSync } from 'node:child_process'

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDatabaseURL(schema: string) {//vai receber schema
  if (!process.env.DATABASE_URL) {
    throw new Error('Please provide a DATABASE_URL environment variable.')
  }

  const url = new URL(process.env.DATABASE_URL)//vai ler essa url

  url.searchParams.set('schema', schema)

  return url.toString()
}



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
    const schema = randomUUID() //nome do meu schema
    const databaseURL = generateDatabaseURL(schema)

    process.env.DATABASE_URL = databaseURL

    execSync('npx prisma migrate deploy')//essa função é tudo o que executo no meu terminal, dploy pula a etapa de da fezer uma nova migration


    return {
      async  teardown() { //quando finaliza, apagar o schema se ele existir
        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`,
        )

        await prisma.$disconnect()//disconect com o banco de dados
      }
    }
  }
}

// npm link
//vai criar um pacote local na minha maquina
// npm link vitest-environment-prisma, cria dentro do meu projeto






