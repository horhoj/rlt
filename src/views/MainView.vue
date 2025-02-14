<script setup lang="ts">
import Inventory from '@/components/Inventory.vue';
import LeftBlock from '@/components/LeftBlock.vue';
import Footer from '@/components/Footer.vue';
</script>

<template>
  <div class="page">
    <main class="main">
      <LeftBlock />
      <Inventory />
    </main>
    <Footer />
  </div>
</template>

<style lang="scss" scoped>
.page {
  padding: 32px;
}
.main {
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
}
</style>
