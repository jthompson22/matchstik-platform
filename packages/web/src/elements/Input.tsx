import React from "react";
import styled from 'styled-components';
import { Colors } from '../styles/Colors';
import * as Polished from 'polished';

type StyledInputProps = {
  margin?: string;
  padding?: string;
  error?: boolean;
}

const InputStyled = styled.input<StyledInputProps>`
  background-color: ${Colors.VeryLightBlue};
  color: ${Colors.Grey1};
  outline: none;
  border: 0px;
  border-radius: 5px;
  height: 33px;
  width: fill-available;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 0 0 0 10px;
  transition: all 0.2s;
  margin: ${props => props.margin};
  padding: ${props => props.padding};
  border: ${props =>
    props.error
      ? `1px solid ${Colors.Red}`
      : `1px solid ${Colors.VeryLightBlue}`};

  ::placeholder {
    color: ${Colors.Grey4};
    font-family: 'Nunito Sans';
    font-weight: 600;
  }

  &:hover {
    background-color: ${Polished.darken(0.01, Colors.VeryLightBlue)};
    border: ${props =>
      props.error
        ? `1px solid ${Colors.Red}`
        : `1px solid ${Polished.darken(0.01, Colors.VeryLightBlue)}`};
  }

  &:focus {
    background-color: ${Polished.darken(0.02, Colors.VeryLightBlue)};
    border: ${props =>
      props.error
        ? `1px solid ${Colors.Red}`
        : `1px solid ${Polished.darken(0.02, Colors.VeryLightBlue)}`};
  }
`;

export type InputProps = {
  autoFocus?: boolean | undefined;
  placeholder?: string;
  value: string;
  defaultValue?: string;
  type?: string;
  onChange?: any;
  onBlur?: any;
  onFocus?: any;
  margin?: string;
  padding?: string;
  error?: string | null;
}

export default function Input({
  autoFocus,
  placeholder,
  value,
  defaultValue,
  type = 'text',
  onChange,
  onBlur,
  onFocus,
  margin,
  padding,
  error,
}: InputProps) {
  return (
    <InputStyled
      autoFocus={autoFocus}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      type={type}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={onFocus}
      margin={margin}
      padding={padding}
      error={Boolean(error)}
    />
  );
}
