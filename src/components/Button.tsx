import React, { FC, MouseEvent } from 'react'
import styled from 'styled-components'

interface Props {
  onClick?: (evt: MouseEvent) => void
  children: React.ReactNode
}

const Button: FC<Props> = ({ onClick, children, ...restofProps }) => {
  return (
    <S.Button onClick={onClick} {...restofProps}>
      {children}
    </S.Button>
  )
}

const S = {
  Button: styled.button`
    border: none;
    outline: none;
    min-width: 100px;
    border-radius: 4px;
    background: blue;
    color: white;
    height: 20px;
  `,
}

export default Button
