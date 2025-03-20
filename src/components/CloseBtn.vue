<script setup lang="ts">
const emit = defineEmits<{
  (e: 'on-click'): void
}>()
</script>

<template>
  <button class="close-btn" @click="emit('on-click')">
    <span class="close-btn__left" />
    <span class="close-btn__rigth" />
  </button>
</template>
