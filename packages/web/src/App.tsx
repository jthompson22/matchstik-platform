import React, { Fragment, useState, useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import styled from 'styled-components';
import PageLoader from './components/PageLoader';
import ReactTooltip from "react-tooltip";
import Modal from './components/modal/Modal';
// Auth
import Login from './pages/Login.page';
import Register from "./pages/Register.page";
import ForgotPassword from "./pages/ForgotPassword.page";
import ResetPassword from "./pages/ResetPassword.page";
import VerifyEmail from "./pages/VerifyEmail.page";
//Dasbhoard
import DashboardLayout from './components/DashboardLayout';
import ProjectList from './pages/ProjectList.page';
import ProjectDetailsContainer from './containers/ProjectDetails.container';

const Container = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
`;

const Tooltip = styled(ReactTooltip)`
  border-radius: 10px;
  padding: 7px 10px;
`;

function DashboardContainer({ match }: any) {
  return (
    <DashboardLayout>
      <Switch>
        <Redirect exact from={`${match.path}/`} to={`${match.path}/projects`} />
        <Route exact path={`${match.path}/projects`} component={ProjectList} />
        <Route path={`${match.path}/projects`} component={ProjectDetailsContainer} />
        {/* <Route path={`${match.path}/events`} component={EventDetailsContainer} />
        <Route path={`${match.path}/orders`} component={OrdersContainer} />
        <Route path={`${match.path}/settings`} component={SettingsContainer} /> */}
      </Switch>
    </DashboardLayout>
  );
}

export default function App() {  
  return (
    <Fragment>
      <Tooltip />
      <Modal />
      {/* <PageLoader /> */}
      <Container>
        <Switch>
          <Redirect exact from="/" to="/login" />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/forgot-password" component={ForgotPassword} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route path="/verify-email" component={VerifyEmail} />
          <Route path="/dashboard" component={DashboardContainer} />
        </Switch>
      </Container>
    </Fragment>
  );
};
