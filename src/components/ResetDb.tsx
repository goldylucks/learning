import React, { FC, useState } from 'react'
import { toast } from 'react-toastify'
import styled from 'styled-components'
import learningApi from '../services/api.service'
import { INewDataArgs } from '../types'
import { reduceRectanglesToDict } from '../utils/rectangles'
import Button from './Button'
import Input from './Input'

interface Props {
  onResetDb: ({ rectangles, connectingLines }: INewDataArgs) => void
}

const ResetDb: FC<Props> = ({ onResetDb }) => {
  const [numberOfRectangles, setNumberOfRectangles] = useState('10')
  const handleReset = async () => {
    try {
      const { rectangles, connectingLines } = await learningApi
        .post('/resetDb', { numberOfRectangles: Number(numberOfRectangles) })
        .then((resp) => resp.data)
      onResetDb({
        rectangles: rectangles.reduce(reduceRectanglesToDict, {}),
        connectingLines,
      })
    } catch (error) {
      console.error(error)
      toast.error('Error resetting DB' + error.message)
    }
  }

  const handleSubmit = (evt: React.FormEvent<HTMLFormElement>) => {
    evt.preventDefault()
    handleReset()
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Number of rectangles</label>
      <S.Input
        type='number'
        value={numberOfRectangles}
        onChange={setNumberOfRectangles}
      />
      <Button>Reset DB</Button>
    </form>
  )
}

const S = {
  Input: styled(Input)`
    display: block;
    width: 100px !important;
    margin: 10px 0;
  `,
}

export default ResetDb
