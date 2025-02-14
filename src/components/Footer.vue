<script setup lang="ts">
import Stub from './Stub.vue';
import CloseBtn from './CloseBtn.vue';
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

<style lang="scss" scoped>
.footer__stub-wrapper {
  width: 100%;
  padding: 18px 14px;
}

.footer__close-btn-wrapper {
  padding: 10px 10px;
}

.footer {
  width: 100%;
  border: 1px solid #4d4d4d;
  border-radius: 12px;
  min-width: 236px;
  background-color: #262626;

  display: flex;
  gap: 20px;
  justify-content: space-between;
}
</style>
