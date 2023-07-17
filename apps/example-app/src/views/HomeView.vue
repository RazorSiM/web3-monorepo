<script setup lang="ts">
import { type FetchEnsAvatarResult, type FetchEnsNameResult, type FetchTokenResult, type GetAccountResult, fetchEnsAvatar, fetchEnsName, fetchToken, getAccount, watchAccount } from '@wagmi/core'

const { t } = useI18n()

const token = ref<FetchTokenResult | null>(null)
const account = ref<GetAccountResult | null>(null)
const ens = ref<{ name: FetchEnsNameResult; avatar: FetchEnsAvatarResult }>({ name: null, avatar: null })

async function fetchAccountInfo() {
  account.value = await getAccount()
}
async function fetchTokenInfo() {
  token.value = await fetchToken({ address: '0x5fbdb2315678afecb367f032d93f642f64180aa3' })
}
async function fetchEnsInfo() {
  if (account.value && account.value.address) {
    ens.value.name = await fetchEnsName({ address: account.value.address, chainId: 1 })
    ens.value.avatar = await fetchEnsAvatar({ name: ens.value.name as string, chainId: 1 })
  }
}

await fetchAccountInfo()
await fetchTokenInfo()
await fetchEnsInfo()

const unwatchAccount = watchAccount((newAccount) => {
  account.value = newAccount
  fetchEnsInfo()
})

onUnmounted(() => {
  unwatchAccount()
})
</script>

<template>
  <main>
    <div class="w-full flex flex-col gap-4">
      <div v-if="account && account.isConnected">
        <h3 class="font-bold text-xl">
          {{ t('account_info') }}:
        </h3>
        <p>{{ t('address') }}: {{ account.address }}</p>
      </div>
      <div v-if="ens && ens.name && ens.avatar">
        <h3 class="font-bold text-xl">
          ENS:
        </h3>
        <p>{{ t('name') }}: {{ ens.name }}</p>
        <p>{{ t('avatar') }}:</p>
        <img class="h-10 w-10 rounded-full" :src="ens.avatar" :alt="ens.name">
      </div>
      <div v-if="token" class="leading-tight">
        <h3 class="font-bold text-xl">
          {{ t('token_info') }}:
        </h3>
        <p>{{ t('name') }}: {{ token.name }}</p>
        <p>{{ t('symbol') }}: {{ token.symbol }}</p>
        <p>{{ t('decimals') }}: {{ token.decimals }}</p>
        <p>{{ t('total_supply') }}: {{ token.totalSupply.formatted }}</p>
      </div>
    </div>
  </main>
</template>
