<script lang="ts" setup>
const props = defineProps<{
  heigth: number;
  radius: number;
  marginsX: number;
  top: number;
}>();
</script>

<template>
  <div
    class="stub__wrapper"
    :style="{
      height: `${heigth}px`,
      borderRadius: `${radius}px`,
      marginLeft: `${marginsX}px`,
      marginRight: `${marginsX}px`,
      marginTop: `${top}px`
    }"
  ></div>
</template>

<style lang="scss" scoped>
.stub__wrapper {
  background: linear-gradient(90deg, #3c3c3c 0%, #444444 51.04%, #333333 100%);
}
</style>
