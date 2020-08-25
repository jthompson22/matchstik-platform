import React from "react";
import styled from "styled-components";
import MainNavigation from './MainNavigation';
import { Colors } from "../styles/Colors";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
  background: ${Colors.White};
  height: 100%;
  overflow: hidden;
  width: 1200px;
  max-width: 90%;
  margin: 0 auto;
  position: relative;
`;

export const Title = styled.div`
  font-size: 26px;
  font-weight: 800;
  color: ${Colors.Grey1};
  margin: 60px 0 30px;
`;

type DashboardLayoutProps = {
  children: React.ReactNode,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>      
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default DashboardLayout;
