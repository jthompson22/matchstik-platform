import React from "react";
import styled from "styled-components";
import MainNavigation from './MainNavigation';
import { Colors } from "../styles/Colors";
import logoSrc from "./../assets/images/logo-dark.svg";

const Container = styled.div`
  position: absolute;
  height: 100vh;
  width: 100vw;
`;

const Content = styled.div`
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

const TopNavigation = styled.form`
  position: relative;
  height: 70px;
  width: calc(100% - 60px);
  padding: 0 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${Colors.White};
  box-shadow: 0px 4px 16px rgba(0, 0, 0, 0.05);
`;

const Row = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.img`
  position: relative;
  width: 165px;
  height: auto;
  margin-right: 10px;
  top: 0px;
`;

const ExternalLink = styled.a`
  font-size: 1.4rem;
  font-weight: 800;
  color: ${Colors.Grey1};
  text-decoration: none;
  margin-left: 30px;
`;


type DashboardLayoutProps = {
  children: React.ReactNode,
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <Container>   
      <TopNavigation>
        <Row>
          <Logo src={logoSrc} />
          {/* <ExternalLink href="/what">How It Works</ExternalLink>
          <ExternalLink href="/what">Find Fundraisers</ExternalLink>
          <ExternalLink href="/what">Browse Non-Profits</ExternalLink> */}
        </Row>
      </TopNavigation>   
      <Content>
        {children}
      </Content>
    </Container>
  );
};

export default DashboardLayout;
