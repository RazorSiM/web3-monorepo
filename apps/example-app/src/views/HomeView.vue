<script setup lang="ts">
import { createPublicClient, getContract, http } from 'viem'
import { localhost } from 'viem/chains'
import { sampleErc20ABI } from '@web3-monorepo/example-erc20'

const client = createPublicClient({
  chain: localhost,
  transport: http(),
})

const blockNumber = await client.getBlockNumber()

const contract = getContract({
  address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
  abi: sampleErc20ABI,
  publicClient: client,
})

const name = await contract.read.name()
const symbol = await contract.read.symbol()
const decimals = await contract.read.decimals()
const totalSupply = await contract.read.totalSupply()
</script>

<template>
  <main>
    {{ blockNumber }}
    {{ name }}
    {{ symbol }}
    {{ decimals }}
    {{ totalSupply }}
  </main>
</template>
