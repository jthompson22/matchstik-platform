import React from "react";
import styled from "styled-components";
import MainNavigation from './MainNavigation';
import { Colors } from "../styles/Colors";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

const ContentContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`;

const Content = styled.div`
  background: ${Colors.White};
  height: 100%;
  overflow: hidden;
  width: calc(100% - 225px);
`;

type DashboardLayoutProps = {
  children: React.ReactNode,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>
      <ContentContainer>
        <MainNavigation />
        <Content>{children}</Content>
      </ContentContainer>
    </Container>
  );
};

export default DashboardLayout;
