export type ElementType = 'green' | 'yellow' | 'blue'
export type InventoryBody = {
  elementType: ElementType
  count: number
}

export type DataItem = {
  id: number
  inventoryBody: InventoryBody | null
}

export type Pointer = {
  left: number
  top: number
}
