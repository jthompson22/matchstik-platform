import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";
import Label from "./Label";
import Flex from "./Flex"

type ContainerProps = {
  width?: string;
  margin?: string
}

const Container = styled.div<ContainerProps>`
  width: ${(props) => props.width};
  margin: ${(props) => props.margin};
`;

type TextAreaStyledProps = {
  padding?: string;
  height?: string;
  width?: string;
  error?: boolean;
};

const TextAreaStyled = styled.textarea<TextAreaStyledProps>`
  background-color: ${Colors.White};
  color: ${Colors.Grey1};
  outline: none;
  border: 0px;
  border-radius: 10px;
  height: ${(props) => props.height};
  width: fill-available;
  font-size: 1.4rem;
  font-weight: 500;
  padding: 15px;
  text-indent: 1px;
  transition: all 0.2s;
  resize: none;
  font-family: "Nunito Sans";
  line-height: 180%;
  border: ${(props) =>
    props.error ? `1px solid ${Colors.Red}` : `1px solid ${Colors.Grey5}`};

  ::placeholder {
    color: ${Colors.Grey4};
    font-family: "Nunito Sans";
    font-weight: 600;
  }

  &:hover {
  }

  &:focus {
  }
`;

export type TextAreaProps = {
  inputRef?: React.Ref<HTMLTextAreaElement>;
  autoFocus?: boolean | undefined;
  placeholder?: string;
  value: string;
  onMouseEnter?: any;
  onMouseLeave?: any;
  onChange?: any;
  onFocus?: any;
  onBlur?: any;
  margin?: string;
  padding?: string;
  width?: string;
  height?: string;
  label?: string;
  error?: string | null;
};

export default function TextArea({
  inputRef,
  autoFocus,
  placeholder,
  value,
  onMouseEnter,
  onMouseLeave,
  onChange,
  onFocus,
  onBlur,
  margin,
  width,
  height,
  label,
  error,
}: TextAreaProps) {
  return (
    <Container width={width} margin={margin}>
      <Flex justify="space-between">
        {label && <Label text={label} />}
      </Flex>
      <TextAreaStyled
        ref={inputRef}
        autoFocus={autoFocus}
        placeholder={placeholder}
        value={value}
        onChange={(e: React.FormEvent<HTMLTextAreaElement>) => {
          onChange(e);
        }}
        onFocus={(event) => {
          if (onFocus) onFocus(event);
        }}
        onBlur={(event) => {
          if (onFocus) onBlur(event);
        }}
        onMouseEnter={(event: any) => {
          if (onMouseEnter) onMouseEnter(event);
        }}
        onMouseLeave={(event: any) => {
          if (onMouseLeave) onMouseLeave(event);
        }}
        height={height}
        error={Boolean(error)}
      />
    </Container>
  );
}
