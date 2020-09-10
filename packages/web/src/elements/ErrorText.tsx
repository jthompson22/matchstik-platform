import React from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";

type ErrorTextProps = {
  large?: boolean;
}

const ErrorText = styled.div<ErrorTextProps>`
  color: ${Colors.Red};
  font-size: ${props => props.large ? '1.6rem': '1.2rem'};
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

export default ErrorText;
