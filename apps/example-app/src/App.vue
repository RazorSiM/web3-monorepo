<script lang="ts" setup>
const route = useRoute()
const layout = computed(() => {
  return route.meta.layout || 'DefaultLayout'
})
</script>

<template>
  <div>
    <component :is="layout">
      <RouterView v-slot="{ Component } ">
        <template v-if="Component">
          <Suspense>
            <component :is="Component" />
            <template #fallback>
              ...loading...
            </template>
          </Suspense>
        </template>
      </RouterView>
    </component>
  </div>
</template>
