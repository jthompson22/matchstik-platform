import React, { Fragment } from "react";
import styled, { css } from "styled-components";
import Button, { ButtonTypes } from '../elements/Button';
import { Colors } from '../styles/Colors';

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 20px;
  border-bottom: 1px solid ${Colors.Grey6};
  background-color: ${Colors.White};
`;

type PageHeaderProps = {
  children: React.ReactNode;
};

export const PageHeader: React.FC<PageHeaderProps> = ({
  children
}) => {
  return (
    <Container>
      {children}
    </Container>
  );
};

const Title = styled.div`
  font-size: 2.2rem;
  font-weight: 700;
  color: ${Colors.Grey1};
`;

type PageTitleProps = {
  children: React.ReactNode;
};

export const PageTitle: React.FC<PageTitleProps> = ({
  children
}) => {
  return (
    <Title>
      {children}
    </Title>
  );
};

