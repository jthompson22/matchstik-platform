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
import DonationsPage from './pages/Donations.page';
import InstallButtonPage from './pages/InstallButton.page';
import SettingsPage from './pages/Settings.page';

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
        <Redirect exact from={`${match.path}/`} to={`${match.path}/overview`} />
        <Route exact path={`${match.path}/overview`} component={DonationsPage} />
        <Route exact path={`${match.path}/install-button`} component={InstallButtonPage} />
        <Route exact path={`${match.path}/settings`} component={SettingsPage} />
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
