export interface IRectangleDict {
  [name: string]: IRectangle
}

export interface IRectangle {
  id?: string
  name: string
  x: number
  y: number
}

export interface IConnectingLine {
  id?: string
  startingNodeName: string
  targetNodeName: string
}

export interface INewDataArgs {
  rectangles: IRectangleDict
  connectingLines: IConnectingLine[]
}
