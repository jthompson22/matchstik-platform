import React from "react";
import styled from "styled-components";
import AuthImage from "./../assets/images/auth-image.svg";
import { Colors } from '../styles/Colors';
import AuthNavigation from "./AuthNavigation";

export const Content = styled.div`
  width: 380px;
  padding-top: 10px;
`;

export const Row = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  margin-bottom: 20px;
  width: 100%;
`;

export const Label = styled.div`
  position: relative;
  font-size: 1.2rem;
  color: ${Colors.Grey1};
  font-weight: 800;
  margin-bottom: 10px;
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
  font-size: 1.4rem;
  font-weight: 600;
`;

export const Footer = styled.div`
  margin: 20px 0 10px;
`;

export const SuccessText = styled.div`
  color: ${Colors.Green};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

const Title = styled.div`
  position: relative;
  font-size: 4.8rem;
  font-weight: 900;
  color: ${Colors.Grey1};
  margin-bottom: 15px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex: 1;
`;

const MainImage = styled.img`
  display: block;
  position: relative;
  width: 80%;
`;

const Container = styled.form`
  position: absolute;
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${Colors.White};
`;

const InnerContainer = styled.div`
  height: calc(100% - 100px);
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
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
    <div>
    <Container onSubmit={onSubmit}>
      <AuthNavigation />
      <InnerContainer>
        <Center>
          <div>
            <Title>{title}</Title>
            {children}
          </div>
        </Center>
        <Center>
          <MainImage src={AuthImage} />
        </Center>
      </InnerContainer>
    </Container>
    </div>
  );
};

export default AuthLayout;
