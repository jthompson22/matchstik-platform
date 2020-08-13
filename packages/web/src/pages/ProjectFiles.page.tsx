import React, { Fragment } from "react";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { MatchstikState } from "../redux/store";
import * as AppActions from "../redux/actions/app.actions";
import { PageHeader, PageTitle } from "../components/PageHeader";
import Button, { ButtonTypes } from "../elements/Button";
import { Colors } from "../styles/Colors";
import { ModalTypes } from "../components/modal/Modal";
import gql from "graphql-tag";
import GET_PROJECT from "../graphql/queries/project.query";
import IProject from "@matchstik/models/.dist/interfaces/IProject";
import PageLoader from "../components/PageLoader";

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

type ProjectFilesProps = {};

const ProjectFiles: React.FC<ProjectFilesProps> = ({}) => {
  /* State */
  const appState = useSelector((state: MatchstikState) => state.app);
  const { projectId } = appState;

  /* Actions */
  const dispatch = useDispatch();

  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: {
      projectId,
    }
  });

  return (
    <Fragment>
      <PageLoader nav={true} fade={!loading} />
      {!loading && (
        <Container>
          {JSON.stringify(data.project)}
        </Container>
      )}
    </Fragment>
  );
}

export default ProjectFiles;
