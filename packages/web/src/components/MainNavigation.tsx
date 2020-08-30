import React from "react";
import styled from "styled-components";
import MainNavigationButtons from './MainNavigationButtons';
import { Colors } from '../styles/Colors';

const Container = styled.div`
  position: relative;
  width: 100%;
`;

type MainNavigationProps = {};

const MainNavigation: React.FC<MainNavigationProps> = () => {
  return (
    <Container>
      <MainNavigationButtons /> 
    </Container>
  );
};

export default MainNavigation;
