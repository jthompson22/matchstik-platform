import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import * as AppActions from "../redux/actions/app.actions";
import ProjectNavigationButtons from "./ProjectNavigationButtons";
import Button, { ButtonTypes } from '../elements/Button';
import { Colors } from "../styles/Colors";
import { ModalTypes } from './modal/Modal';

const Container = styled.div`
  width: 225px;
  min-width: 225px;
  max-width: 225px;
  background-color: ${Colors.Grey3};
  box-shadow: 4px 0px 20px rgba(0, 0, 0, 0.05);
`;

const OrgInfoContainer = styled.div`
  margin: 20px 20px 0px 20px;
`;

type MainNavigationProps = {};

const MainNavigation: React.FC<MainNavigationProps> = () => {
  /* Actions */
  const dispatch = useDispatch();

  const uploadFiles = () =>
    dispatch(AppActions.pushModal(ModalTypes.UploadFiles));

  return (
    <Container>
      <Button
        type={ButtonTypes.Submit}
        onClick={() => uploadFiles()}
        text="Upload Files"
        width="100%"
        margin="15px"
      />
      <ProjectNavigationButtons />
    </Container>
  );
};

export default MainNavigation;
