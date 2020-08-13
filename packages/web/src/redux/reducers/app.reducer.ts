import {
  AppActionTypes,
  AppActionCreatorTypes,
  SetProjectIdAction,
  PushModalAction,
  PopModalAction,
  PushModalConfirmActionAction,
  SetFileUploadAction,
  StartFileUploadAction,
  FinishFileUploadAction,
  SetSaveChangesAction,
} from "../actions/app.actions";
import { ModalTypes, urlSafeModalTypes } from "../../components/modal/Modal";
import UrlParams from "../../models/interfaces/UrlParams";
import * as UrlUtil from "../../utils/UrlUtil";
import IConfirmAction from "../../models/interfaces/IConfirmAction";
import ISaveChanges from "../../models/interfaces/ISaveChanges";
import IFileUpload from "../../models/interfaces/IFileUpload";
import saveChangesState from "../../models/states/saveChanges.state";
import fileUploadState from "../../models/states/fileUpload.state";

type ErrorState = {
  errorMsg: string | null;
  show: boolean;
};

const errorState = (): ErrorState => {
  return {
    errorMsg: null,
    show: false,
  };
};

const confirmActionState = (): IConfirmAction => {
  return {
    title: "",
    message: "",
    confirm: null,
    cancel: null,
  };
};

export type AppReducerState = {
  projectId: string;
  modals: ModalTypes[];
  fileUpload: IFileUpload;
  error: ErrorState;
  saveChanges: ISaveChanges;
  confirmAction: IConfirmAction;
  intercomEnabled: boolean;
};

function appReducerState(): AppReducerState {
  const { query } = UrlUtil.parse(window.location.toString());
  const { projectId = '', modalType = "" }: UrlParams = query;

  const isSafeModal = Object.values(urlSafeModalTypes).includes(
    modalType as ModalTypes
  );
  const modals = modalType && isSafeModal ? [modalType as ModalTypes] : [];

  if (modalType && !isSafeModal) {
    UrlUtil.setQueryString({ modalType: null });
  }

  return {
    projectId,
    modals,
    fileUpload: fileUploadState(),
    error: errorState(),
    saveChanges: saveChangesState(),
    confirmAction: confirmActionState(),
    intercomEnabled: false,
  };
}

export default function reducer(
  state = appReducerState(),
  action: AppActionCreatorTypes
) {
  const { type, payload } = action;

  switch (type) {
    case AppActionTypes.SET_PROJECT_ID:
      return setProjectId(
        state,
        payload as SetProjectIdAction["payload"],
      )
    case AppActionTypes.PUSH_MODAL:
      return pushModal(state, payload as PushModalAction["payload"]);

    case AppActionTypes.POP_MODAL:
      return popModal(state, payload as PopModalAction["payload"]);

    case AppActionTypes.PUSH_MODAL_CONFIRM_ACTION:
      return pushModalConfirmAction(
        state,
        payload as PushModalConfirmActionAction["payload"]
      );

    case AppActionTypes.SET_FILE_UPLOAD:
      return setFileUpload(state, payload as SetFileUploadAction["payload"]);

    case AppActionTypes.START_FILE_UPLOAD:
      return startFileUpload(
        state,
        payload as StartFileUploadAction["payload"]
      );

    case AppActionTypes.FINISH_FILE_UPLOAD:
      return finishFileUpload(
        state,
        payload as FinishFileUploadAction["payload"]
      );

    case AppActionTypes.SET_SAVE_CHANGES:
      return setSaveChanges(state, payload as SetSaveChangesAction["payload"]);

    default:
      return state;
  }
}

/********************************************************************************
 *  Set Id
 *******************************************************************************/
function setProjectId(
  state: AppReducerState,
  { projectId }: { projectId: string }
): AppReducerState {
  UrlUtil.setQueryString({ projectId });
  return {
    ...state,
    projectId,
  };
}

/********************************************************************************
 *  Modal
 *******************************************************************************/

function pushModal(
  state: AppReducerState,
  { modalType }: { modalType: ModalTypes }
): AppReducerState {
  let modals = [...state.modals];
  UrlUtil.setQueryString({ modalType });
  modals.push(modalType);

  return {
    ...state,
    modals,
  };
}

function popModal(
  state: AppReducerState,
  payload: PopModalAction["payload"]
): AppReducerState {
  UrlUtil.setQueryString({ modalType: null });
  let modals = [...state.modals];
  modals.pop();

  return {
    ...state,
    modals,
  };
}

function pushModalConfirmAction(
  state: AppReducerState,
  { confirmAction }: { confirmAction: IConfirmAction }
): AppReducerState {
  state = pushModal(state, { modalType: ModalTypes.ConfirmAction });
  state.confirmAction = confirmAction;
  return state;
}

/********************************************************************************
 *  File Upload
 *******************************************************************************/

function setFileUpload(
  state: AppReducerState,
  fileUpload: Partial<IFileUpload>
): AppReducerState {
  return {
    ...state,
    fileUpload: {
      ...state.fileUpload,
      ...fileUpload,
    },
  };
}

function startFileUpload(
  state: AppReducerState,
  { blob, key }: { blob: string; key: string }
): AppReducerState {
  const modalType = ModalTypes.ImageCropper;
  state = pushModal(state, { modalType });
  const fileUpload = { ...state.fileUpload };
  fileUpload.keys.push(key);
  fileUpload.blob = blob;

  return {
    ...state,
    fileUpload: {
      ...state.fileUpload,
      ...fileUpload,
    },
  };
}

function finishFileUpload(
  state: AppReducerState,
  { key }: { key: string }
): AppReducerState {
  const fileUpload = {
    keys: state.fileUpload.keys.filter((stateKey) => stateKey !== key),
  };

  return {
    ...state,
    fileUpload: {
      ...state.fileUpload,
      ...fileUpload,
    },
  };
}

/********************************************************************************
 *  Save Changes
 *******************************************************************************/

function setSaveChanges(
  state: AppReducerState,
  saveChanges: Partial<ISaveChanges>
): AppReducerState {
  return {
    ...state,
    saveChanges: {
      ...state.saveChanges,
      ...saveChanges,
    },
  };
}
