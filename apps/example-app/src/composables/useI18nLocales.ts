import { watchEffect } from 'vue'
import { useNavigatorLanguage, useStorage } from '@vueuse/core'
import type { Ref, WritableComputedRef } from 'vue'
import type { RemovableRef } from '@vueuse/core'
import { useI18n } from 'vue-i18n'

export interface IUseI18nLocales {
  locale: WritableComputedRef<string>
  availableLocales: string[]
  navigatorLanguage: Ref<string | undefined>
  userSelectedLanguage: RemovableRef<string>
  setLanguage: (language: string) => void
}

export function useI18nLocales(preferredAppLanguage?: string): IUseI18nLocales {
  // load the i18n locale and availableLocales from the i18n plugin
  const { locale, availableLocales } = useI18n()

  // load the navigatorLanguage from the browser
  const { language: navigatorLanguage } = useNavigatorLanguage()
  /**
   * load the userSelectedLanguage from localStorage. If it doesn't exist, it will be an empty string and the key will be created in localStorage
   */
  const userSelectedLanguage: RemovableRef<string> = useStorage('userSelectedLanguage', '')
  /**
   * set the userSelectedLanguage.
   * If the language is in the `availableLocales`, set the userSelectedLanguage to the language.
   * If the language is not in the `availableLocales`, but the stripped language is in the `availableLocales`, set the userSelectedLanguage to the stripped language.
   * If the language is not in the `availableLocales` and the stripped language is not in the `availableLocales`, set the userSelectedLanguage to the first `availableLocales`.
   * If the `preferredAppLanguage` is set and is in the `availableLocales`, set the userSelectedLanguage to the `preferredAppLanguage`.
  */
  const setLanguage = (language: string) => {
    const strippedLanguage = language.replace(/-.*$/, '')
    if (availableLocales.includes(language)) {
      userSelectedLanguage.value = language
    }
    else if (availableLocales.includes(strippedLanguage)) {
      userSelectedLanguage.value = strippedLanguage
    }
    else {
      if (preferredAppLanguage && availableLocales.includes(preferredAppLanguage))
        userSelectedLanguage.value = preferredAppLanguage
      else
        userSelectedLanguage.value = availableLocales[0]
    }
  }

  // onMounted and every reactive change, set the i18n locale to
  // the userSelectedLanguage or the navigatorLanguage. Updates the userSelectedLanguage too.
  watchEffect(() => {
    if (!userSelectedLanguage.value && navigatorLanguage.value)
      setLanguage(navigatorLanguage.value)
    else
      locale.value = userSelectedLanguage.value
  })

  return {
    locale,
    availableLocales,
    navigatorLanguage,
    userSelectedLanguage,
    setLanguage,
  }
}
