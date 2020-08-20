import React, { useState } from "react";
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import Button, { ButtonTypes } from "../elements/Button";
import logoSrc from "./../assets/images/logo-dark.svg";
import { Colors } from "../styles/Colors";
import Link from '../elements/Link';

const Container = styled.div`
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

type AuthNavigationProps = {};

const AuthNavigation: React.FC<AuthNavigationProps> = () => {
  /** Hooks */
  const history = useHistory();

  /** Render */
  return (
    <Container>
      <Row>
        <Logo src={logoSrc} />
        <ExternalLink href="/what">How It Works</ExternalLink>
        <ExternalLink href="/what">Find Fundraisers</ExternalLink>
        <ExternalLink href="/what">Browse Non-Profits</ExternalLink>
      </Row>
      <Row>
        <Link to="/login">Login</Link>
        <Button
          type={ButtonTypes.Submit}
          onClick={() => history.push('/register')}
          text="Get Started"
          margin="0 0 0 30px"
          width="190px"
        />
      </Row>
    </Container>
  );
}

export default AuthNavigation;
