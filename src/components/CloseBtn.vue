<script setup lang="ts">
const emit = defineEmits<{
  (e: 'on-click'): void;
}>();
</script>

<template>
  <button class="close-btn" :onclick="emit('on-click')">
    <span class="close-btn__left" />
    <span class="close-btn__rigth" />
  </button>
</template>

<style lang="scss" scoped>
.close-btn {
  width: 20px;
  height: 20px;
  cursor: pointer;
  position: relative;
  background-color: rgba(0, 0, 0, 0);
  outline: none;
  border: none;
}

.close-btn__left {
  width: 15px;
  height: 1px;
  background-color: #fff;
  transform: rotateZ(45deg);
  position: absolute;
  left: 0;
  top: 8px;
}

.close-btn__rigth {
  width: 15px;
  height: 1px;
  background-color: #fff;
  transform: rotateZ(135deg);
  position: absolute;
  left: 0;
  top: 8px;
}
</style>
