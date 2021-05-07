import { IConnectingLine, INewDataArgs, IRectangle } from '../types'
import { reduceRectanglesToDict } from './rectangles'

interface DataFromServer {
  rectangles: IRectangle[]
  connectingLines: IConnectingLine[]
}

export const formatDataFromServer = ({
  rectangles,
  connectingLines,
}: DataFromServer): INewDataArgs => ({
  rectangles: rectangles.reduce(reduceRectanglesToDict, {}),
  connectingLines,
})
