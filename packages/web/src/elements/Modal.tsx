import React, { ReactNode } from "react";
import styled from "styled-components";
import { Colors } from "../styles/Colors";

interface ContainerProps {}

const Container = styled.div<ContainerProps>`
  position: relative;
  height: auto;
  width: auto;
  background-color: ${Colors.White};
  border-radius: 5px;
  padding: 15px;
`;

const Header = styled.div`
  position: relative;
  margin-bottom: 10px;
`;

const Title = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: ${Colors.Grey1};
`;

export type ModalProps = {
  title?: string;
  children: ReactNode;
};

export default function Button({
  title,
  children,
}: ModalProps) {
  return (
    <Container>
      <Header>{title && <Title>{title}</Title>}</Header>
      {children}
    </Container>
  );
}
