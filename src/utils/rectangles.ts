import { IRectangle, IRectangleDict } from '../types'

export function reduceRectanglesToDict(
  acc: IRectangleDict,
  item: IRectangle
): IRectangleDict {
  acc[item.name] = item
  return acc
}
