import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import * as AppActions from '../redux/actions/app.actions';

type NavigateToProjectDetails = (projectId?: string) => void;

type NavigateToProjectDetailsHook = () => NavigateToProjectDetails;

const useNavigateToProjectDetails: NavigateToProjectDetailsHook = () => {
  /** Routing */
  const history = useHistory();

  /* Actions */
  const dispatch = useDispatch();
  const setProjectId = (projectId: string) => dispatch(AppActions.setProjectId(projectId));

  const createProject = React.useCallback((projectId, eventType = false) => {
    setProjectId(projectId);
    history.push(`/dashboard/projects/details?projectId=${projectId}`);
  }, []);

  /** Return */
  return createProject;
};

export default useNavigateToProjectDetails;
