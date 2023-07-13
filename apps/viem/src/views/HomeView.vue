<script setup lang="ts">
import { createPublicClient, getContract, http } from 'viem'
import { localhost } from 'viem/chains'
import { sampleErc20ABI } from 'sample-erc20'

const client = createPublicClient({
  chain: localhost,
  transport: http(),
})

const blockNumber = await client.getBlockNumber()

const contract = getContract({
  address: '0xcf7ed3acca5a467e9e704c703e8d87f634fb0fc9',
  abi: sampleErc20ABI,
  publicClient: client,
})

const name = await contract.read.name()
</script>

<template>
  <main>
    {{ blockNumber }}
    {{ name }}
  </main>
</template>
