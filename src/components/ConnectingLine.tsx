import React, { FC } from 'react'

import { IRectangle } from '../types'

interface Props {
  startingNode: IRectangle
  targetNode: IRectangle
  startingNodeRef: HTMLElement
  targetNodeRef: HTMLElement
}

const ConnectingLine: FC<Props> = ({
  startingNode,
  targetNode,
  startingNodeRef,
  targetNodeRef,
}) => {
  const rectanglesReady =
    startingNodeRef && targetNodeRef && startingNode && targetNode

  if (!rectanglesReady) return null

  return (
    <svg width='800' height='800' style={{ position: 'absolute', zIndex: -1 }}>
      <line
        x1={startingNode.x + startingNodeRef.offsetWidth}
        y1={startingNode.y + startingNodeRef.offsetHeight / 2}
        x2={targetNode.x}
        y2={targetNode.y + targetNodeRef.offsetHeight / 2}
        stroke='blue'
      />
    </svg>
  )
}

export default ConnectingLine
