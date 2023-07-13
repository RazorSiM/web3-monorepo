# Web3 Monorepo
## Dependencies
You're supposed to use `pnpm` and the `nodejs` version specified in `.nvmrc`.
Help yourself with `fnm` to install the correct version:
```bash
fnm install
# enable corepack and install pnpm
corepack enable
corepack prepare pnpm@latest --activate
```

## How to run it
Install the dependencies from the root of the project:
```bash
pnpm i
```

Compile the contracts, build the artifacts and generate the typescript ABI constants:

```bash
pnpm --filter sample-erc20 compile
pnpm --filter sample-erc20 generate
pnpm --filter sample-erc20 build
```

Start the hardhat node and deploy the contracts:
```bash
pnpm --filter sample-erc20 node:hardhat
pnpm --filter sample-erc20 deploy:hardhat
```

Grab the contract address and replace it in the `./apps/viem/src/HomeView.vue` file:
```ts
const contract = getContract({
    address: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    abi: sampleErc20ABI,
    publicClient: client
})
```

Run the vue app:
```bash
pnpm --filter viem dev
```

Enjoy!