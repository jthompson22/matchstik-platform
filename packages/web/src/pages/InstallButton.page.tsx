import React from 'react';
import styled from 'styled-components';
import { useQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { MatchstikState } from "../redux/store";
import * as AppActions from "../redux/actions/app.actions";
import { Link } from 'react-router-dom';
import { PageHeader, PageTitle } from '../components/PageHeader';
import Button, { ButtonTypes } from '../elements/Button';
import { Colors } from '../styles/Colors';
import { ModalTypes } from '../components/modal/Modal';
import gql from 'graphql-tag';
import LIST_PROJECTS from '../graphql/queries/projects.query';
import useNavigateToProjectDetails from '../hooks/useNavigateToProjectDetails.hook';
import { Title } from '../components/DashboardLayout';
import MainNavigation from '../components/MainNavigation';
import EmbedButtonCreator from '../components/EmbedButtonCreator';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fill-available;
`;

const Content = styled.div`
  height: fill-available;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  padding-bottom: 200px;
  overflow: scroll;
  background-color: ${Colors.White};
`;

type InstallButtonPageProps = {};

const InstallButtonPage: React.FC<InstallButtonPageProps> = ({}) => {
  /* Hooks */
  const navigateToProjectDetails = useNavigateToProjectDetails();
  /* State */
  const appState = useSelector((state: MatchstikState) => state.app);

  /* Actions */
  const dispatch = useDispatch();

  const createProject = () =>
    dispatch(AppActions.pushModal(ModalTypes.CreateProject));

  const { data, loading, error } = useQuery(LIST_PROJECTS);

  return (
    <Container>
      <Title>Install Button</Title>
      <MainNavigation />
      <EmbedButtonCreator />
    </Container>
  );
};

export default InstallButtonPage;
