<script setup lang="tsx">
import { ref, watchEffect } from 'vue'
import InventoryDrawer from './InventoryDrawer.vue'
import type { DataItem, Pointer } from '@/types'
import classNames from 'classnames'
import { getInventoryItemImg } from '@/helpers/getInventoryItemImg'
import InventoryDrawerBtn from './InventoryDrawerBtn.vue'

const startData: () => DataItem[] = () => {
  const data: DataItem[] = Array(25)
    .fill(null)
    .map((_, i) => ({ id: i + 1, inventoryBody: null }))
  data[0] = { ...data[0], inventoryBody: { elementType: 'green', count: 1 } }
  data[1] = { ...data[1], inventoryBody: { elementType: 'yellow', count: 2 } }
  data[2] = { ...data[2], inventoryBody: { elementType: 'blue', count: 5 } }
  return data
}

const DATA_LS_KEY = 'DATA_LS_KEY'

const saveDataFromLS = (data: DataItem[]) => localStorage.setItem(DATA_LS_KEY, JSON.stringify(data))

const loadDataFromLS = () => {
  const str = localStorage.getItem(DATA_LS_KEY)
  return str === null ? startData() : (JSON.parse(str) as DataItem[])
}

const data = ref<DataItem[]>(loadDataFromLS())
const elementDrag = ref<DataItem | null>(null)
const elementDragEnter = ref<DataItem | null>(null)

const elementDragPosition = ref<Pointer>({ left: 0, top: 0 })
const dragMouseOffset = ref<Pointer>({ left: 0, top: 0 })
const isDrag = ref(false)
const deleteModalData = ref<DataItem | null>(null)

watchEffect(() => saveDataFromLS(data.value))

const setMousePosition = (e: MouseEvent) => {
  elementDragPosition.value = {
    left: e.x - dragMouseOffset.value.left - 23,
    top: e.y - dragMouseOffset.value.top - 23
  }
}

const handleDragMouseMove = (e: MouseEvent) => {
  isDrag.value = true
  setMousePosition(e)
}

const handleDragMouseUp = () => {
  if (!isDrag.value) {
    deleteModalData.value = elementDrag.value
  } else {
    if (elementDragEnter.value && elementDrag.value) {
      const tmpDragBody = elementDrag.value.inventoryBody
      const tmpDragEnterBody = elementDragEnter.value.inventoryBody
      elementDragEnter.value.inventoryBody = tmpDragBody
      elementDrag.value.inventoryBody = tmpDragEnterBody
    }
  }
  window.removeEventListener('mousemove', handleDragMouseMove)
  window.removeEventListener('mouseup', handleDragMouseUp)

  elementDrag.value = null
  elementDragEnter.value = null
  elementDragPosition.value = { left: 0, top: 0 }
  dragMouseOffset.value = { left: 0, top: 0 }
  document.body.style.cursor = 'auto'
  isDrag.value = false
}

const handleMouseDown = (el: DataItem, e: MouseEvent) => {
  if (el.inventoryBody === null) return
  elementDrag.value = el
  window.addEventListener('mousemove', handleDragMouseMove)
  window.addEventListener('mouseup', handleDragMouseUp)
  if (e.target instanceof HTMLElement) {
    const rect = e.target.getBoundingClientRect()
    const left = e.clientX - rect.left
    const top = e.clientY - rect.top
    dragMouseOffset.value = { left, top }
  }
  document.body.style.cursor = 'grab'
  setMousePosition(e)
}

const handleDragTargetMouseEnter = (el: DataItem) => {
  if (!elementDrag.value) return
  elementDragEnter.value = el
}

const handleDragTargetMouseLeave = () => {
  elementDragEnter.value = null
}

const handleDeleteCancel = () => {
  deleteModalData.value = null
}

const handleDeleteSubmit = (count: number) => {
  if (deleteModalData.value && deleteModalData.value.inventoryBody) {
    deleteModalData.value.inventoryBody.count -= count
    if (deleteModalData.value.inventoryBody.count <= 0) {
      deleteModalData.value.inventoryBody = null
    }
    deleteModalData.value = null
  }
}

const handleDefautInventory = () => {
  data.value = startData()
}
</script>

<template>
  <div class="inventory">
    <Teleport to="body">
      <div class="inventory__reset-btn">
        <InventoryDrawerBtn size="standart" skin="warning" @on-click="handleDefautInventory">
          Сбросить инвентарь на умолчания
        </InventoryDrawerBtn>
      </div>
    </Teleport>

    <Transition>
      <InventoryDrawer
        v-if="deleteModalData && deleteModalData.inventoryBody"
        :max-count="deleteModalData.inventoryBody.count"
        :element-type="deleteModalData.inventoryBody.elementType"
        @on-cancel="handleDeleteCancel"
        @on-submit="handleDeleteSubmit"
      />
    </Transition>
    <div
      v-if="elementDrag && elementDrag.inventoryBody"
      :style="{ left: `${elementDragPosition.left}px`, top: `${elementDragPosition.top}px` }"
      class="inventory__drag-item-wrapper"
    >
      <img
        class="inventory__drag-item"
        :src="getInventoryItemImg(elementDrag.inventoryBody.elementType)"
      />
    </div>
    <div class="inventory__grid">
      <li
        v-for="item in data"
        :key="item.id"
        :class="
          classNames(
            'inventory__grid-item',
            elementDragEnter?.id === item.id && 'inventory__drag-item-enter'
          )
        "
        @mouseenter="() => handleDragTargetMouseEnter(item)"
        @mouseleave="handleDragTargetMouseLeave"
      >
        <template v-if="item.inventoryBody && item.id !== elementDrag?.id">
          <img
            class="inventory__item"
            @mousedown="(e: MouseEvent) => handleMouseDown(item, e)"
            :src="getInventoryItemImg(item.inventoryBody.elementType)"
          />
          <div class="inventory__item-counter">{{ item.inventoryBody.count }}</div>
        </template>
      </li>
    </div>
  </div>
</template>
