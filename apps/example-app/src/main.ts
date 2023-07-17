import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

import messages from '@intlify/unplugin-vue-i18n/messages'
import App from './App.vue'
import router from './router'
import DefaultLayout from '@/layouts/DefaultLayout.vue'
import { initWeb3Modal } from '@/utils'

import 'virtual:uno.css'
import '@unocss/reset/tailwind-compat.css'
import '@/assets/global.css'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages,
})
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.component('DefaultLayout', DefaultLayout)

app.mount('#app')

const { web3Modal } = initWeb3Modal()

web3Modal.subscribeEvents((event) => {
  switch (event.name) {
    case 'ACCOUNT_DISCONNECTED': {
      window.location.reload()
      break
    }
  }
})
