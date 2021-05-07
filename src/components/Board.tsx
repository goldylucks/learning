import React, { FC, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import { IConnectingLine, IRectangle, IRectangleDict } from '../types'
import ConnectingLine from './ConnectingLine'
import Rectangle from './Rectangle'

interface Props {
  rectangles: IRectangleDict
  connectingLines: IConnectingLine[]
  onDragRectangle: (rectangle: IRectangle) => void
  onDragRectangleEnd: (rectangle: IRectangle) => void
}

interface RectangleRefs {
  [name: string]: any
}

const Board: FC<Props> = ({
  rectangles,
  connectingLines,
  onDragRectangle,
  onDragRectangleEnd,
}) => {
  const rectanglesRefs: RectangleRefs = useRef({})
  const [
    rectanglesRefsInState,
    setRectanglesRefsInState,
  ] = useState<RectangleRefs>({})

  const handleRectangleUpdateRef = (name: string, elem: HTMLElement): void => {
    rectanglesRefs.current[name] = elem
  }

  useEffect(() => {
    const didAllRectanglesRegisteredRef =
      Object.keys(rectanglesRefs.current).length ===
      Object.keys(rectangles).length
    if (didAllRectanglesRegisteredRef) {
      setRectanglesRefsInState(rectanglesRefs.current)
    }
  }, [rectanglesRefs, rectangles])

  return (
    <S.Container>
      {Object.values(rectangles).map((r) => (
        <Rectangle
          onUpdateRef={handleRectangleUpdateRef}
          onDrag={onDragRectangle}
          onDragEnd={onDragRectangleEnd}
          key={r.name}
          {...r}
        />
      ))}
      {connectingLines.map((cl) => (
        <ConnectingLine
          key={`${cl.startingNodeName}-${cl.targetNodeName}`}
          startingNode={rectangles[cl.startingNodeName]}
          startingNodeRef={rectanglesRefsInState[cl.startingNodeName]}
          targetNode={rectangles[cl.targetNodeName]}
          targetNodeRef={rectanglesRefsInState[cl.targetNodeName]}
        />
      ))}
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    overflow: hidden;
    position: relative;
    width: 800px;
    height: 400px;
    border: 1px solid black;
  `,
}

export default Board
