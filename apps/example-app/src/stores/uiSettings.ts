import { defineStore } from 'pinia'
import { useI18nLocales } from '@/composables/useI18nLocales'

export const uiSettingsStore = defineStore('uiSettings', () => {
  const defaultLanguage = useStorage('defaultLanguage', '')
  function setDefaultLanguage(language: string) {
    defaultLanguage.value = language
  }
  const { availableLocales, navigatorLanguage, userSelectedLanguage, setLanguage } = useI18nLocales()
  return {
    defaultLanguage,
    setDefaultLanguage,
    availableLocales,
    navigatorLanguage,
    userSelectedLanguage,
    setLanguage,
  }
})
