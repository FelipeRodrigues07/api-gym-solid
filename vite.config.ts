import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tsconfigPaths()], //entender path@, importações
  test: {
    environmentMatchGlobs: [['src/http/controllers/**', 'prisma']],
  },
})