<script lang="ts" setup>
const props = defineProps<{
  selectedLanguage: string
  languages: string[]
}>()
const emit = defineEmits<{
  'update:selectedLanguage': [value: string]
}>()

function handleUpdateSelectedLanguage(value: string) {
  emit('update:selectedLanguage', value)
}
</script>

<template>
  <header class="p-3 bg-black flex justify-between">
    <div class="flex gap-2">
      <button v-for="language in props.languages" :key="language" class="bg-transparent text-white font-bold" :class="{ 'text-red-400!': selectedLanguage === language }" @click="handleUpdateSelectedLanguage(language)">
        {{ language }}
      </button>
    </div>
    <w3m-core-button icon="hide" />
  </header>
</template>
