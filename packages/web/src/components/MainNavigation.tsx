import React from "react";
import styled from "styled-components";
import MainNavigationButtons from './MainNavigationButtons';
import { Colors } from '../styles/Colors';

const Container = styled.div`
  width: 225px;
  min-width: 225px;
  max-width: 225px;
  background-color: ${Colors.DarkBlue};
  box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.05);
`;

const OrgInfoContainer = styled.div`
  margin: 20px 20px 0px 20px;
`;

type MainNavigationProps = {};

const MainNavigation: React.FC<MainNavigationProps> = () => {
  return (
    <Container>
      {/* <OrgInfoContainer>
        <OrganizationInfo />
      </OrgInfoContainer> */}
      <MainNavigationButtons /> 
    </Container>
  );
};

export default MainNavigation;
