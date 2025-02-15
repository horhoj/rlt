<script lang="ts" setup>
import { getInventoryItemImg } from '@/helpers/getInventoryItemImg';
import type { ElementType } from '@/types';
import Stub from './Stub.vue';
import { ref } from 'vue';
import CloseBtn from './CloseBtn.vue';

defineProps<{
  maxCount: number;
  elementType: ElementType;
}>();

const emit = defineEmits<{
  (e: 'on-submit', count: number): void;
  (e: 'on-cancel'): void;
}>();

const count = ref(1);
const isShowDeleteConfirmation = ref(false);

const handleInput = (e: InputEvent) => {
  if (e.target && e.target instanceof HTMLInputElement) {
    e.target.value = e.target.value.replace(/[^\d-]/g, '');
    console.log(e.target.value);
    let numVal = Number.parseInt(e.target.value);
    if (Number.isNaN(numVal)) numVal = 0;
    count.value = numVal;
  }
};
</script>

<template>
  <div class="delete-modal__wrapper">
    <img :src="getInventoryItemImg(elementType)" class="delete-modal__element-img" />
    <div>
      <div class="delete-modal__top-divider" />
      <Stub :width="211" :heigth="30" :radius="8" :margins-x="20" :top="16" />
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="20" :top="24" />
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="20" :top="16" />
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="20" :top="16" />
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="35" :top="16" />
    </div>
    <template v-if="isShowDeleteConfirmation">
      <div class="delete-modal__bottom-divider" />
      <input
        class="delete-modal__input"
        placeholder="Введите количество"
        type="number"
        :oninput="handleInput"
        :defaultValue="1"
      />
      <div class="delete-modal__buttons-wrapper">
        <button
          class="delete-modal__cancel-btn"
          :onclick="() => (isShowDeleteConfirmation = false)"
        >
          Отмена
        </button>
        <button class="delete-modal__submit-btn" :onclick="() => emit('on-submit', count)">
          Подтвердить
        </button>
      </div>
    </template>
    <template v-if="!isShowDeleteConfirmation">
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="35" :top="16" />
      <Stub :width="211" :heigth="10" :radius="4" :margins-x="85" :top="16" />
      <div class="delete-modal__bottom-divider" />
      <button class="delete-modal__delete-btn" :onclick="() => (isShowDeleteConfirmation = true)">
        Удалить предмет
      </button>
    </template>
  </div>
  <div class="delete-modal__close-btn-wrapper">
    <CloseBtn :onclick="() => emit('on-cancel')" />
  </div>
</template>

<style lang="scss" scoped>
.delete-modal__close-btn-wrapper {
  position: absolute;
  z-index: 10;
  top: 8px;
  right: 8px;
}
.delete-modal__buttons-wrapper {
  padding: 20px 20px 0 20px;

  display: flex;
  justify-content: center;
  gap: 10px;
}

.delete-modal__cancel-btn {
  height: 33px;
  border-radius: 8px;
  font-size: 14px;
  width: 88px;
  border: none;
  outline: none;
  cursor: pointer;
}

.delete-modal__delete-btn {
  height: 40px;
  border-radius: 8px;
  font-size: 14px;
  width: calc(100% - 30px);
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #fa7272;
  color: #ffffff;
  display: block;
  margin: 18px 15px 0 15px;
}

.delete-modal__submit-btn {
  height: 33px;
  border-radius: 8px;
  font-size: 14px;
  width: 112px;
  border: none;
  outline: none;
  cursor: pointer;
  background-color: #fa7272;
  color: #ffffff;
}

.delete-modal__input {
  margin: 20px auto 0 auto;
  display: block;
  background-color: #262626;
  border: 1px solid #4d4d4d;
  height: 40px;
  padding: 20px;
  width: 210px;
  border-radius: 4px;
  outline: none;
  color: #ffffff;
  font-size: 14px;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  -moz-appearance: textfield;
  -webkit-appearance: none;
}
.delete-modal__stubs-block {
  padding: 16px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.delete-modal__element-img {
  width: 130px;
  height: 130px;
  margin: 55px auto 0 auto;
  display: block;
}

.delete-modal__top-divider {
  border: 1px solid #4d4d4d;
  width: calc(100% - 30px);
  height: 1px;
  margin: 30px 15px 0 15px;
}

.delete-modal__bottom-divider {
  border: 1px solid #4d4d4d;
  width: 100%;
  height: 1px;
  margin: 16px 0 0 0;
}

.delete-modal__wrapper {
  position: absolute;
  right: 0;
  top: 0;
  z-index: 10;
  min-width: 256px;
  height: 100%;
  border-top-right-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid #4d4d4d;
  backdrop-filter: blur(16px);
  background-color: rgba($color: #262626, $alpha: 0.8);
}
</style>
