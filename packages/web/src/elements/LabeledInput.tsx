import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";
import Input, { InputProps } from './Input';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

const Label = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${Colors.Grey2};
  margin-bottom: 5px;
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
      {label && <Label>{label}</Label>}
      <Input {...inputProps} />
      {inputProps.error && <ErrorText>{inputProps.error}</ErrorText>}
    </Container>
  );
}
