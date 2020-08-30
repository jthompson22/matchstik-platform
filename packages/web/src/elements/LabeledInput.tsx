import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";
import Input, { InputProps } from './Input';
import Label from './Label';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const ErrorText = styled.div`
  color: ${Colors.Red};
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 5px;
`;

export type LabeledInputProps = InputProps & {label?: string}

export default function LabeledInput({
  label,
  ...inputProps
}: LabeledInputProps) {
  return (
    <Container>
      {label && <Label text={label} />}
      <Input {...inputProps} />
      {inputProps.error && <ErrorText>{inputProps.error}</ErrorText>}
    </Container>
  );
}
