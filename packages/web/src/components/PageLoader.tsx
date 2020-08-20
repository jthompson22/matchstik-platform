import React from "react";
import styled from "styled-components";
import Loader, { LoaderSizes } from "../elements/Loader";
import { Colors } from "../styles/Colors";

type ContainerProps = {
  fade: boolean;
  nav: boolean
};

const Container = styled.div<ContainerProps>`
  position: fixed;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${props => props.nav ? null : Colors.White};
  z-index: 1000;
  visibility: ${(props) => (props.fade ? "hidden" : null)};
  opacity: ${(props) => (props.fade ? 0 : null)};
  transition: ${(props) =>
    props.fade ? "visibility 0.2s 0.2s, opacity 0.2s ease-out" : null};
`;

type LoaderContainerProps = {
  nav: boolean
};

const LoaderContainer = styled.div<LoaderContainerProps>`
  position: relative;
  top: ${(props) => (props.nav ? "-60px" : null)};
  left: ${(props) => (props.nav ? "-60px" : null)};
`;

type PageLoaderProps = {
  nav?: boolean;
  fade?: boolean;
}

const PageLoader: React.FC<PageLoaderProps> = ({
  nav = false,
  fade,
}) => {
  const [innerFade, setInnerFade] = React.useState(false);

  React.useEffect(() => {
    setTimeout(() => setInnerFade(true), 1000);
  }, []);

  return (
    <Container fade={typeof fade === 'boolean' ? fade : innerFade} nav={nav}>
      <LoaderContainer nav={nav}>
        <Loader size={LoaderSizes.Large} color={Colors.Pink} />
      </LoaderContainer>
    </Container>
  );
}

export default PageLoader;
