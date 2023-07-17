<script lang="ts" setup>
import { uiSettingsStore } from '@/stores/uiSettings'

defineOptions({
  name: 'DefaultLayout',
})
const uiSettings = uiSettingsStore()
const languages = ['en', 'it']
</script>

<template>
  <div class="transition duration-100">
    <MainHeader v-model:selectedLanguage="uiSettings.userSelectedLanguage" :languages="languages" />
    <main class="p-3">
      <slot />
    </main>
  </div>
</template>
