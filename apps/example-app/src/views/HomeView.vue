<script setup lang="ts">
import { type GetAccountResult, fetchToken, getAccount, watchAccount } from '@wagmi/core'
import { onUnmounted, ref } from 'vue'

const token = await fetchToken({
  address: '0x5fbdb2315678afecb367f032d93f642f64180aa3',
})

const account = ref<GetAccountResult | null>(null)
account.value = await getAccount()

const unwatchAccount = watchAccount((newAccount) => {
  account.value = newAccount
})

onUnmounted(() => {
  unwatchAccount()
})
</script>

<template>
  <main>
    <w3m-core-button icon="hide" />
    <div class="w-full flex flex-col">
      <div>
        {{ token.name }}
        {{ token.symbol }}
        {{ token.decimals }}
        {{ token.totalSupply.formatted }}
      </div>
      <div v-if="account">
        {{ account.address }}
        {{ account.status }}
      </div>
    </div>
  </main>
</template>
