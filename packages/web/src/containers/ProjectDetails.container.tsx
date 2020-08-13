import React, { Fragment } from 'react';
import { Link, Route } from 'react-router-dom';
import styled from 'styled-components';
import ProjectFiles from '../pages/ProjectFiles.page';
// import ProjectOrders from '../pages/ProjectOrders.page';
import ProjectNavigation from '../components/ProjectNavigation';
import { Colors } from '../styles/Colors';

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
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


type ProjectDetailsContainerProps = {
  match: any;
};

const ProjectDetailsContainer: React.FC<ProjectDetailsContainerProps> = ({ match }) =>{
  return (
    <Container>
      <ProjectNavigation />
      <Content>
        <Route path={`${match.url}/details`} component={ProjectFiles} />
        {/* <Route path={`${match.url}/orders`} component={ProjectOrders} /> */}
      </Content>
    </Container>
  );
};

export default ProjectDetailsContainer;
