<script setup lang="ts">
import classNames from 'classnames'

defineProps<{
  skin: 'warning' | 'main'
  size: 'standart' | 'big'
}>()

const emit = defineEmits<{
  (e: 'on-click'): void
}>()
</script>

<template>
  <button :class="classNames('inventory__drawer-btn', skin, size)" @click="emit('on-click')">
    <slot />
  </button>
</template>
