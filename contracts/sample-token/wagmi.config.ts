import { defineConfig } from '@wagmi/cli'
import { hardhat } from '@wagmi/cli/plugins'


export default defineConfig({
  out: 'src/generated.ts',
  contracts: [],
  plugins: [
    hardhat({
      project: './',
      commands: {
        clean: 'pnpm hardhat clean',
        build: 'pnpm hardhat compile',
        rebuild: 'pnpm hardhat compile'
      }
    })  
  ],
})
