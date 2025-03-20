import itemGreenImg from '@/assets/inventory-item__green.svg'
import itemYellowImg from '@/assets/inventory-item__yellow.svg'
import itemBlueImg from '@/assets/inventory-item__blue.svg'
import type { ElementType } from '@/types'

export const getInventoryItemImg = (elementType: ElementType) => {
  const imgs: Record<ElementType, string> = {
    blue: itemBlueImg,
    green: itemGreenImg,
    yellow: itemYellowImg
  }
  return imgs[elementType]
}
