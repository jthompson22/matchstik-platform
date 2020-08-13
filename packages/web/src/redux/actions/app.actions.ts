import { ModalTypes } from "../../components/modal/Modal";
import IConfirmAction from "../../models/interfaces/IConfirmAction";
import ISaveChanges from "../../models/interfaces/ISaveChanges";
import IFileUpload from "../../models/interfaces/IFileUpload";
export const AppActionTypes = {
  SET_PROJECT_ID: "SET_PROJECT_ID",
  PUSH_MODAL: "PUSH_MODAL",
  POP_MODAL: "POP_MODAL",
  PUSH_MODAL_CONFIRM_ACTION: "PUSH_MODAL_CONFIRM_ACTION",
  SET_FILE_UPLOAD: "SET_FILE_UPLOAD",
  START_FILE_UPLOAD: "START_FILE_UPLOAD",
  FINISH_FILE_UPLOAD: "FINISH_FILE_UPLOAD",
  SET_SAVE_CHANGES: "SET_SAVE_CHANGES",
};

/********************************************************************************
 *  App Action Creators
 *******************************************************************************/

export type AppActionCreatorTypes =
  | SetProjectIdAction
  | PushModalAction
  | PopModalAction
  | PushModalConfirmActionAction
  | SetFileUploadAction
  | StartFileUploadAction
  | FinishFileUploadAction
  | SetSaveChangesAction;

/********************************************************************************
 *  Set Id
 *******************************************************************************/

export interface SetProjectIdAction {
  type: typeof AppActionTypes.SET_PROJECT_ID;
  payload: {
    projectId: string;
  };
}

export function setProjectId(projectId: string): SetProjectIdAction {
  return {
    type: AppActionTypes.SET_PROJECT_ID,
    payload: {
      projectId,
    },
  };
}

/********************************************************************************
 *  Push Modal
 *******************************************************************************/

export interface PushModalAction {
  type: typeof AppActionTypes.PUSH_MODAL;
  payload: {
    modalType: ModalTypes;
  };
}

export function pushModal(modalType: ModalTypes): PushModalAction {
  return {
    type: AppActionTypes.PUSH_MODAL,
    payload: {
      modalType,
    },
  };
}

export interface PushModalConfirmActionAction {
  type: typeof AppActionTypes.PUSH_MODAL_CONFIRM_ACTION;
  payload: {
    confirmAction: IConfirmAction;
  };
}

export function pushModalConfirmAction(
  confirmAction: IConfirmAction
): PushModalConfirmActionAction {
  return {
    type: AppActionTypes.PUSH_MODAL_CONFIRM_ACTION,
    payload: {
      confirmAction,
    },
  };
}

/********************************************************************************
 *  Pop Modal
 *******************************************************************************/
export interface PopModalAction {
  type: typeof AppActionTypes.POP_MODAL;
  payload: {};
}

export function popModal(): PopModalAction {
  return {
    type: AppActionTypes.POP_MODAL,
    payload: {},
  };
}

/********************************************************************************
 *  File Upload
 *******************************************************************************/

export interface SetFileUploadAction {
  type: typeof AppActionTypes.SET_FILE_UPLOAD;
  payload: Partial<IFileUpload>;
}

export function setFileUpload(
  fileUpload: Partial<IFileUpload>
): SetFileUploadAction {
  return {
    type: AppActionTypes.SET_FILE_UPLOAD,
    payload: fileUpload,
  };
}

export interface StartFileUploadAction {
  type: typeof AppActionTypes.START_FILE_UPLOAD;
  payload: {
    blob: string;
    key: string;
  };
}

export function startFileUpload(
  blob: string,
  key: string
): StartFileUploadAction {
  return {
    type: AppActionTypes.START_FILE_UPLOAD,
    payload: {
      blob,
      key,
    },
  };
}

export interface FinishFileUploadAction {
  type: typeof AppActionTypes.FINISH_FILE_UPLOAD;
  payload: {
    key: string;
  };
}

export function finishFileUpload(key: string): FinishFileUploadAction {
  return {
    type: AppActionTypes.FINISH_FILE_UPLOAD,
    payload: {
      key,
    },
  };
}

// /************************************************************
//  *  Set Save Changes
//  ***********************************************************/

export interface SetSaveChangesAction {
  type: typeof AppActionTypes.SET_SAVE_CHANGES;
  payload: Partial<ISaveChanges>;
}

export function setSaveChanges(
  saveChanges: Partial<ISaveChanges>
): SetSaveChangesAction {
  return {
    type: AppActionTypes.SET_SAVE_CHANGES,
    payload: saveChanges,
  };
}
