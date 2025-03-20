<script lang="ts" setup>
const props = defineProps<{
  heigth: number
  radius: number
  marginsX: number
  top: number
}>()
</script>

<template>
  <div
    class="stub"
    :style="{
      height: `${props.heigth}px`,
      borderRadius: `${props.radius}px`,
      marginLeft: `${props.marginsX}px`,
      marginRight: `${props.marginsX}px`,
      marginTop: `${top}px`
    }"
  ></div>
</template>
