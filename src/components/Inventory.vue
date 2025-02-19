<script lang="ts" setup>
import classNames from 'classnames';
import { ref, watchEffect } from 'vue';
import { getInventoryItemImg } from '@/helpers/getInventoryItemImg';
import InventoryDeleteModal from './InventoryDeleteModal.vue';

import type { DataItem, Pointer } from '@/types';

const startData: () => DataItem[] = () => {
  const data: DataItem[] = Array(25)
    .fill(null)
    .map((_, i) => ({ id: i + 1, inventoryBody: null }));
  data[0] = { ...data[0], inventoryBody: { elementType: 'green', count: 1 } };
  data[1] = { ...data[1], inventoryBody: { elementType: 'yellow', count: 2 } };
  data[2] = { ...data[2], inventoryBody: { elementType: 'blue', count: 5 } };
  return data;
};

const DATA_LS_KEY = 'DATA_LS_KEY';

const saveDataFromLS = (data: DataItem[]) =>
  localStorage.setItem(DATA_LS_KEY, JSON.stringify(data));

const loadDataFromLS = () => {
  const str = localStorage.getItem(DATA_LS_KEY);
  return str === null ? startData() : (JSON.parse(str) as DataItem[]);
};

const data = ref<DataItem[]>(loadDataFromLS());
const elementDrag = ref<DataItem | null>(null);
const elementDragEnter = ref<DataItem | null>(null);
const wrapperDOMElRef = ref<HTMLDivElement | null>(null);
const elementDragPosition = ref<Pointer>({ left: 0, top: 0 });
const dragMouseOffset = ref<Pointer>({ left: 0, top: 0 });
const isDrag = ref(false);
const deleteModalData = ref<DataItem | null>(null);

watchEffect(() => saveDataFromLS(data.value));

const setMousePosition = (e: MouseEvent) => {
  elementDragPosition.value = {
    left: e.x - dragMouseOffset.value.left - 23,
    top: e.y - dragMouseOffset.value.top - 23
  };
};

const handleDragMouseMove = (e: MouseEvent) => {
  isDrag.value = true;
  setMousePosition(e);
};

const handleDragMouseUp = () => {
  if (!isDrag.value) {
    deleteModalData.value = elementDrag.value;
  } else {
    if (elementDragEnter.value && elementDrag.value) {
      const tmpDragBody = elementDrag.value.inventoryBody;
      const tmpDragEnterBody = elementDragEnter.value.inventoryBody;
      elementDragEnter.value.inventoryBody = tmpDragBody;
      elementDrag.value.inventoryBody = tmpDragEnterBody;
    }
  }
  window.removeEventListener('mousemove', handleDragMouseMove);
  window.removeEventListener('mouseup', handleDragMouseUp);

  elementDrag.value = null;
  elementDragEnter.value = null;
  elementDragPosition.value = { left: 0, top: 0 };
  dragMouseOffset.value = { left: 0, top: 0 };
  document.body.style.cursor = 'auto';
  isDrag.value = false;
};

const handleMouseDown = (el: DataItem, e: MouseEvent) => {
  if (el.inventoryBody === null) return;
  elementDrag.value = el;
  window.addEventListener('mousemove', handleDragMouseMove);
  window.addEventListener('mouseup', handleDragMouseUp);
  if (e.target instanceof HTMLElement) {
    const rect = e.target.getBoundingClientRect();
    const left = e.clientX - rect.left;
    const top = e.clientY - rect.top;
    dragMouseOffset.value = { left, top };
  }
  document.body.style.cursor = 'grab';
  setMousePosition(e);
};

const handleDragTargetMouseEnter = (el: DataItem) => {
  if (!elementDrag.value) return;
  elementDragEnter.value = el;
};

const handleDragTargetMouseLeave = () => {
  elementDragEnter.value = null;
};

const handleDeleteCancel = () => {
  deleteModalData.value = null;
};

const handleDeleteSubmit = (count: number) => {
  if (deleteModalData.value && deleteModalData.value.inventoryBody) {
    deleteModalData.value.inventoryBody.count -= count;
    if (deleteModalData.value.inventoryBody.count <= 0) {
      deleteModalData.value.inventoryBody = null;
    }
    deleteModalData.value = null;
  }
};

const handleDefautInventory = () => {
  data.value = startData();
};
</script>

<template>
  <div>
    <div>
      <button :onclick="handleDefautInventory" class="inventory__clear-btn">
        Сброcить инвентарь на умолчания
      </button>
    </div>
    <div class="inventory__wrapper" ref="wrapperDOMElRef">
      <InventoryDeleteModal
        v-if="deleteModalData && deleteModalData.inventoryBody"
        :max-count="deleteModalData.inventoryBody.count"
        :element-type="deleteModalData.inventoryBody.elementType"
        @on-cancel="handleDeleteCancel"
        @on-submit="handleDeleteSubmit"
      />
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

      <ul class="inventory__list">
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
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.inventory__clear-btn {
  height: 33px;
  border-radius: 8px;
  font-size: 14px;
  border: none;
  outline: none;
  cursor: pointer;
  width: 100%;
  margin-bottom: 10px;
  background-color: #262626;
  color: #ffffff;
  height: 40px;
}

.inventory__wrapper {
  position: relative;
  user-select: none;
}

.inventory__list {
  list-style: none;
  width: 525px;
  height: 525px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  border-radius: 12px;
}

.inventory__grid-item {
  background-color: #262626;
  border-right: 1px solid #4d4d4d;
  border-bottom: 1px solid #4d4d4d;
  &:nth-child(5n + 1) {
    border-left: 1px solid #4d4d4d;
  }
  &:nth-child(-n + 5) {
    border-top: 1px solid #4d4d4d;
  }

  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  &:nth-child(25) {
    border-bottom-right-radius: 12px;
  }
  &:nth-child(21) {
    border-bottom-left-radius: 12px;
  }
  &:nth-child(1) {
    border-top-left-radius: 12px;
  }
  &:nth-child(5) {
    border-top-right-radius: 12px;
  }
}

.inventory__item {
  position: absolute;
  width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.inventory__item-counter {
  bottom: 0;
  right: 0;
  position: absolute;
  width: 16px;
  height: 16px;
  border-top: 1px solid #4d4d4d;
  border-left: 1px solid #4d4d4d;
  font-size: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 6px;
}

.inventory__drag-item {
  width: 54px;
  height: 54px;
  justify-content: center;
  align-items: center;
  display: flex;
}

.inventory__drag-item-wrapper {
  position: fixed;
  z-index: 10;
  pointer-events: none;
  border: 1px solid #4d4d4d;
  padding: 0;
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 24px;
  background-color: #262626;
}

.inventory__drag-item-enter {
  background-color: #333;
}
</style>
