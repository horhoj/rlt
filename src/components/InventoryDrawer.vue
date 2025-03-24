<script setup lang="ts">
import { getInventoryItemImg } from '@/helpers/getInventoryItemImg'
import type { ElementType } from '@/types'
import Stub from './Stub.vue'
import InventoryDrawerBtn from './InventoryDrawerBtn.vue'
import { computed, ref } from 'vue'
import CloseBtn from './CloseBtn.vue'
import classNames from 'classnames'

defineProps<{
  maxCount: number
  elementType: ElementType
}>()

const emit = defineEmits<{
  (e: 'on-submit', count: number): void
  (e: 'on-cancel'): void
}>()

const isShowDeleteForm = ref(false)
const count = ref('1')
const inputRef = ref<HTMLInputElement | null>(null)
const error = computed(() => {
  const val = Number.parseInt(count.value)
  return Number.isFinite(val)
})

const handleCancel = () => {
  isShowDeleteForm.value = false
  count.value = '1'
}

const handleChange = (e: Event) => {
  if (e.target instanceof HTMLInputElement) {
    count.value = e.target.value
  }
}

const handleConfirm = () => {
  const val = Number.parseInt(count.value)
  if (error.value) {
    emit('on-submit', val)
  }
}
</script>

<template>
  <div class="inventory__drawer">
    <div class="inventory__drawer-close-btn-wrapper">
      <CloseBtn @on-click="emit('on-cancel')" />
    </div>
    <img :src="getInventoryItemImg(elementType)" class="inventory__drawer-img" />
    <div class="inventory__drawer-top-divider" />
    <Stub :heigth="30" :margins-x="15" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="15" :radius="8" :top="24" />
    <Stub :heigth="10" :margins-x="15" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="15" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="35" :radius="8" :top="16" />
    <Stub :heigth="10" :margins-x="85" :radius="8" :top="16" />
    <div class="inventory__drawer-bottom-divider" />
    <div class="inventory__drawer-btns-wrapper">
      <InventoryDrawerBtn size="big" skin="warning" @on-click="() => (isShowDeleteForm = true)">
        Удалить предмет
      </InventoryDrawerBtn>
    </div>
    <Transition>
      <div class="inventory__drawer-delete-form" v-if="isShowDeleteForm">
        <input
          :class="classNames('inventory__drawer-delete-form-input', !error && 'error')"
          placeholder="Введите количество"
          :value="count"
          @input="handleChange"
          ref="inputRef"
        />
        <div class="inventory__drawer-delete-form-btns-wrapper">
          <InventoryDrawerBtn size="standart" skin="main" @on-click="handleCancel">
            Отмена
          </InventoryDrawerBtn>
          <InventoryDrawerBtn size="standart" skin="warning" @on-click="handleConfirm">
            Подтвердить
          </InventoryDrawerBtn>
        </div>
      </div>
    </Transition>
  </div>
</template>
