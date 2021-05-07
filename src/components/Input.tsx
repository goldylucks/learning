import React, { FC } from 'react'
import styled from 'styled-components'

interface Props {
  value: string
  onChange: (nextValue: string) => void
  placeholder?: string
  type?: string
  className?: string
}

const Input: FC<Props> = ({
  value,
  onChange,
  placeholder,
  type,
  className,
  ...rest
}) => {
  return (
    <S.Input
      value={value}
      onChange={(evt: React.FormEvent<HTMLInputElement>) =>
        onChange(evt.currentTarget.value)
      }
      type={type}
      className={className}
    />
  )
}

const S = {
  Input: styled.input`
    outline: none;
    width: 120px;
    padding: 0 10px;
    height: 20px;
    border: 1px solid #ccc;
    border-radius: 4px;
  `,
}

export default Input
