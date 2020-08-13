import React from "react";
import styled from "styled-components";
import { useSelector, useDispatch } from "react-redux";
import Icon, { Icons } from '../../elements/Icon'
import { Colors } from '../../styles/Colors';
import * as Polished from "polished";
import { MatchstikState } from "../../redux/store";
import { FadeIn, CardPop } from "../../elements/Motion";
import CreateProjectModal from "./CreateProjectModal";
import UploadFilesModal from "./UploadFilesModal";

export enum ModalTypes {
  CreateProject = "CreateProject",
  SaveChanges = "SaveChanges",
  ConfirmAction = "ConfirmAction",
  ImageCropper = "ImageCropper",
  UploadFiles = "UploadFiles",
}

export const urlSafeModalTypes = {}

export enum ModalPositions {
  Top = 'Top',
  Center = 'Center',
}

const positions = {
  [ModalTypes.CreateProject]: ModalPositions.Top,
  [ModalTypes.SaveChanges]: ModalPositions.Top,
  [ModalTypes.ConfirmAction]: ModalPositions.Top,
  [ModalTypes.ImageCropper]: ModalPositions.Top,
  [ModalTypes.UploadFiles]: ModalPositions.Top,
};

/********************************************************************************
 *  Modal
 *******************************************************************************/

 type ContainerProps = {
   isTop: boolean;
 }

const Container = styled(FadeIn)<ContainerProps>`
  position: fixed;
  height: ${props => props.isTop ? 'calc(100% - 200px)' : '100%'};
  width: 100%;
  background-color: ${Polished.rgba(Colors.Black, 0.4)};
  display: flex;
  justify-content: center;
  align-items: ${props => props.isTop ? 'flex-start' : 'center'};
  padding: ${props => props.isTop ? '100px 0' : '0'};
  z-index: 900;
  overflow-y: scroll;
`;

type ModalProps = {};

const Modal: React.FC<ModalProps> = () => {
  /* State */
  const appState = useSelector((state: MatchstikState) => state.app);
  const { modals } = appState;

  /** Render */
  if (!modals.length) return null;

  const isTop = positions[[...modals].pop() as ModalTypes] === ModalPositions.Top;

  return (
    <Container duration={0.10} isTop={isTop}>
      {modals.map((modal, index) => {
        return (
          <RenderModal key={index} modal={modal} active={index === modals.length - 1} />
        );
      })}
    </Container>
  );
};

export default Modal;

/********************************************************************************
 *  Render Modal
 *******************************************************************************/

 type RenderModalContainerProps = {
   active: boolean;
 };

 const RenderModalContainer = styled.div<RenderModalContainerProps>`
  position: ${props => props.active ? null : 'absolute'};
  top: ${(props) => (props.active ? null : "-10000000px")}; 
  left: ${(props) => (props.active ? null : "-10000000px")}; 
 `;

type RenderModalProps = {
  modal: ModalTypes;
  active: boolean;
};

const RenderModal: React.FC<RenderModalProps> = ({ modal, active }) => {
  return (
    <RenderModalContainer active={active}>
      {(() => {
        switch (modal) {
          case ModalTypes.CreateProject:
            return <CreateProjectModal />;
          case ModalTypes.UploadFiles:
            return <UploadFilesModal />;
          default:
            return <div />;
        }
      })()}
    </RenderModalContainer>
  );
};

/********************************************************************************
 *  Exported Modal Styles - for use in modal implmentations
 *******************************************************************************/

type ModalContainerProps = {
  height?: string;
  width?: string;
};

export const ModalContainer = styled(CardPop)<ModalContainerProps>`
  position: relative;
  height: ${(props) => props.height};
  width: ${(props) => props.width};
  border-radius: 5px;
  background-color: ${Colors.White};
  overflow: visible;
`;

const ModalHeaderContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 49px;
  padding: 0 20px;
  border-radius: 5px 5px 0px 0px;
  background-color: ${Colors.White};
  border-bottom: 1px solid ${Colors.Grey6};
`;

const ModalTitle = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
  color: ${Colors.Grey1};
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

type ModalHeaderProps = {
  title: string;
  icon?: any;
  close: Function;
};

export const ModalHeader: React.FC<ModalHeaderProps> = ({ title, icon, close }) => {
  return (
    <ModalHeaderContainer>
     <Row>
        {icon && icon}
        <ModalTitle>{title}</ModalTitle>
     </Row>
      <Icon
        icon={Icons.CancelCircle}
        color={Colors.Grey5}
        hoverColor={Colors.Red}
        size={14}
        onClick={close}
      />
    </ModalHeaderContainer>
  );
};

type ModalContentHeight = {
  height?: string;
};

export const ModalContent = styled.div<ModalContentHeight>`
  position: relative;
  padding: 20px;
  /* background-color: ${Colors.WhiteSmoke}; */
  height: ${(props) => props.height};
`;

export const ModalFooter = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 59px;
  padding: 0 20px;
  background-color: ${Colors.White};
  border-top: 1px solid ${Colors.Grey6};
  border-radius: 0px 0px 5px 5px;
`;
