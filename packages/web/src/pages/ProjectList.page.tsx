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
import IProject from '@matchstik/models/.dist/interfaces/IProject';
import useNavigateToProjectDetails from '../hooks/useNavigateToProjectDetails.hook';

const file = gql`
  query File {
    file {
      results {
        alternatives {
          transcript
          confidence
          words {
            startTime {
              seconds 
              nano
            }
            endTime {
              seconds
              nanos
            }
            word
          }
        }
      }
    }
  }
`;

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

const Project = styled.div`
  display: border-box;
  width: 320px;
  height: 195px;
  padding: 15px;
  margin-left: 30px;
  margin-top: 30px;
  border-radius: 5px;
  border: 1px solid ${Colors.Grey6};
  background-color: ${Colors.White};
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.1);
  }
`;

type ProjectListProps = {};

const ProjectList: React.FC<ProjectListProps> = ({}) => {
  /* Hooks */
  const navigateToProjectDetails = useNavigateToProjectDetails();
  /* State */
  const appState = useSelector((state: MatchstikState) => state.app);
  // const { projectId, projectsCache } = appState;
  // const project = projectsCache[projectId];

  /* Actions */
  const dispatch = useDispatch();

  const createProject = () =>
    dispatch(AppActions.pushModal(ModalTypes.CreateProject));

  const { data, loading, error } = useQuery(LIST_PROJECTS);

  return (
    <Container>
      <PageHeader>
        <PageTitle>Projects</PageTitle>
        <Button
          type={ButtonTypes.Submit}
          onClick={() => createProject()}
          text="Create Project"
          width="180px"
        />
      </PageHeader>
      <Content>
        {data?.projects.map((project: IProject) => {
          return (
            <Project onClick={() => navigateToProjectDetails(project._id)}>
              {project.name}
            </Project>
          );
        })}
      </Content>
    </Container>
  );
};

export default ProjectList;
