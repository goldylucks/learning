import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import Board from './components/Board'
import ResetDb from './components/ResetDb'
import learningApi from './services/api.service'
import ReplaceDataService from './services/ReplaceData.service'
import {
  IConnectingLine,
  IRectangleDict,
  INewDataArgs,
  IRectangle,
} from './types'

let dataSyncService: ReplaceDataService // yes this is hacky, it's really time for redux/context...

function App() {
  const [rectangles, setRectangles] = useState<IRectangleDict>({})
  const [connectingLines, setConnectingLines] = useState<IConnectingLine[]>([])

  const handleReplaceDataFromServer = useCallback(
    ({ rectangles, connectingLines }: INewDataArgs) => {
      setRectangles({}) // not sure why this is needed, but without it reverting optimistic update for dragging doesn't work
      setRectangles(rectangles)
      setConnectingLines(connectingLines)
    },
    []
  )

  const handleDragRectangle = ({ id, name, x, y }: IRectangle) => {
    setRectangles({
      ...rectangles,
      [name]: { id, name, x, y },
    })
  }

  const handleDragRectangleEnd = async (rectangle: IRectangle) => {
    try {
      await learningApi.patch(`/rectangles/${rectangle.name}`, rectangle)
    } catch (error) {
      console.error(error)
      toast.error('Error updating rectangle, reverting')
      dataSyncService.refresh()
    }
  }

  useEffect(() => {
    dataSyncService = new ReplaceDataService(handleReplaceDataFromServer)
    dataSyncService.init()
  }, [handleReplaceDataFromServer])

  return (
    <S.Container>
      <div>
        <S.ResetDbContainer>
          <ResetDb onResetDb={handleReplaceDataFromServer} />
        </S.ResetDbContainer>
        <Board
          onDragRectangle={handleDragRectangle}
          onDragRectangleEnd={handleDragRectangleEnd}
          rectangles={rectangles}
          connectingLines={connectingLines}
        />
      </div>
    </S.Container>
  )
}

const S = {
  Container: styled.div`
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  `,
  ResetDbContainer: styled.div`
    margin-bottom: 20px;
  `,
}

export default App
