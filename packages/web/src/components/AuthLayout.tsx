import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as Polished from "polished";
import logoSrc from "./../assets/images/logo-wide.png";
import backgroundImageSrc from "./../assets/images/bg-image.jpeg";
import Modal from "./../elements/Modal";
import { Colors } from '../styles/Colors';

export const AuthContainer = styled.form`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* background-image: url(${backgroundImageSrc}); */
  background-position: left;
`;

export const Overlay = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: ${Polished.rgba(Colors.DarkBlue, 1)};
`;

type ContainerProps = {
  children: React.ReactNode;
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export const Container = ({ children, onSubmit }: ContainerProps) => {
  return (
    <AuthContainer onSubmit={onSubmit}>
      <Overlay />
      {children}
    </AuthContainer>
  );
};

export const HeaderContainer = styled.div`
  height: 23vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  z-index: 1000;
`;

export const Header = () => (
  <HeaderContainer>
    <Logo />
  </HeaderContainer>
);

const LogoContainer = styled.div`
  margin-bottom: 20px;
`;

const LogoImg = styled.img`
  position: relative;
  width: 300px;
`;

const LogoText = styled.div`
  font-size: 3rem;
  font-weight: 600;
  color: ${Colors.White};
`;

export const Logo = () => (
  <LogoContainer>
    <Link to="/">
      {/* <LogoText>Matchstik</LogoText> */}
      <LogoImg src={logoSrc} />
    </Link>
  </LogoContainer>
);

export const Content = styled.div`
  width: 320px;
  padding-top: 10px;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 10px;
  width: 100%;
`;

type FlexProps = {
  flex: string;
};

export const Flex = styled.div<FlexProps>`
  flex: ${props => props.flex};
`;
export const Spacer = styled.div`
  flex: 0.05;
`;

export const Text = styled.div`
  color: ${Colors.Grey1};
  font-size: 1.2rem;
  font-weight: 600;
`;

export const Footer = styled.div`
  margin: 20px 0 10px;
`;

type ErrorTextProps = {
  large?: boolean;
}

export const ErrorText = styled.div<ErrorTextProps>`
  color: ${Colors.Red};
  font-size: ${props => props.large ? '1.6rem': '1.2rem'};
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

export const SuccessText = styled.div`
  color: ${Colors.Green};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

type AuthLayoutProps = {
  title?: string,
  onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void,
  children: React.ReactNode,
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  title,
  onSubmit,
  children,
}) => {
  return (
    <Container onSubmit={onSubmit}>
      <Header />
      <Modal title={title}>{children}</Modal>
    </Container>
  );
};

export default AuthLayout;
