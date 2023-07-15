# Web3 Monorepo
## Dependencies
You're supposed to use `pnpm` and the `nodejs` version specified in `.nvmrc`.
Help yourself with `fnm` or `nvm` to install the correct version:
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

### Using Turbo
The repository comes with Turbo tasks configured to make your life easier.
Let's say you want to run the `example-app` in development mode:
```bash
pnpm dev:example-app
```
This command will run all the commands you need to start the application in development mode, reading the dependency graph and running the commands in the correct order (or in parallel, if possible) based on the `turbo.json` tasks.

After you have it running, open a new terminal tab and run:
```bash
pnpm localNode:example-erc20
```

This will run the the hardhat node and deploy the contracts. You can now interact with the app.

This is the limitation with long running tasks and turbo: you can't run them in parallel.


### Without Turbo

Compile the contracts, build the artifacts and generate the typescript ABI constants:

```bash
pnpm --filter example-erc20 compile
pnpm --filter example-erc20 generate
pnpm --filter example-erc20 build
```

Start the hardhat node and deploy the contracts:
```bash
pnpm --filter example-erc20 node:hardhat
pnpm --filter example-erc20 deploy:hardhat
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
pnpm --filter example dev
```

Enjoy!