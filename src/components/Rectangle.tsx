import React, { FC, useEffect, useRef } from 'react'
import styled from 'styled-components'
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable'

import { IRectangle } from '../types'

interface Props extends IRectangle {
  onDrag: (rectangle: IRectangle) => void
  onDragEnd: (rectangle: IRectangle) => void
  onUpdateRef: (name: string, elem: HTMLElement) => void
}

const Rectangle: FC<Props> = ({
  id,
  name,
  x,
  y,
  onDrag,
  onDragEnd,
  onUpdateRef,
}) => {
  const containerEl = useRef(null)

  const handleDrag = (e: DraggableEvent, data: DraggableData): void | false => {
    onDrag({ id, name, x: data.x, y: data.y })
  }

  const handleDragEnd = (
    e: DraggableEvent,
    data: DraggableData
  ): void | false => {
    onDragEnd({ id, name, x: data.x, y: data.y })
  }

  useEffect(() => {
    onUpdateRef(name, containerEl.current!)
  }, [name, onUpdateRef])

  return (
    <Draggable
      defaultPosition={{ x, y }}
      onDrag={handleDrag}
      onStop={handleDragEnd}
    >
      <S.Container ref={containerEl}>
        <S.Name>{name}</S.Name>
        <S.LeftConnector />
        <S.RightConnector />
      </S.Container>
    </Draggable>
  )
}

const CONNECTOR_DIMENSIONS = 10

const Connector = styled.div`
  position: absolute;
  width: ${CONNECTOR_DIMENSIONS}px;
  height: ${CONNECTOR_DIMENSIONS}px;
  border-radius: 50%;
  background: #eee;
  top: 50%;
  transform: translateY(-50%);
`

const S = {
  Container: styled.div`
    position: absolute;
    height: 40px;
    min-width: 120px;
    padding-right: 10px;
    padding-left: 10px;
    border: 1px solid #cdcbcb;
    display: flex;
    align-items: center;
    justify-content: center;
    white-space: nowrap;
    cursor: grabbing;
  `,
  Name: styled.span`
    color: black;
  `,
  LeftConnector: styled(Connector)`
    left: ${-CONNECTOR_DIMENSIONS / 2}px;
  `,
  RightConnector: styled(Connector)`
    right: ${-CONNECTOR_DIMENSIONS / 2}px;
  `,
}

export default Rectangle
