<script setup lang="ts">
import Stub from './Stub.vue'
import CloseBtn from './CloseBtn.vue'
</script>

<template>
  <footer class="footer">
    <div class="footer__stub-wrapper">
      <Stub :heigth="36" :radius="12" :top="0" :margins-x="0" />
    </div>
    <div class="footer__close-btn-wrapper">
      <CloseBtn />
    </div>
  </footer>
</template>
