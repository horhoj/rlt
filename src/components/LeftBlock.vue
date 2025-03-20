<script lang="ts" setup>
import leftBlockImg from '@/assets/left-block__img.png'
import Stub from './Stub.vue'
</script>

<template>
  <div class="left-block__wrapper">
    <img :src="leftBlockImg" class="left-block__img" />
    <Stub :heigth="26" :margins-x="9" :radius="8" :top="20" />
    <Stub :heigth="10" :margins-x="27" :radius="8" :top="24" />
    <Stub :heigth="10" :margins-x="9" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="19" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="15" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="24" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="55" :radius="8" :top="24" />
  </div>
</template>
