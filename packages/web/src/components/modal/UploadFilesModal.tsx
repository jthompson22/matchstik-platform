import React, { useState } from "react";
import styled from "styled-components";
import Joi from "@hapi/joi";
import { useMutation } from "@apollo/react-hooks";
import CREATE_PROJECT from "../../graphql/mutations/createProject.mutation";
import UPLOAD_FILES from "../../graphql/mutations/uploadFiles.mutation";
import { useDispatch } from "react-redux";
import * as AppActions from "../../redux/actions/app.actions";
import * as ErrorUtil from "../../utils/ErrorUtil";
import makeEventHandler from "../../utils/makeEventHandler";
import Button, { ButtonTypes } from "../../elements/Button";
import { useDropzone } from "react-dropzone";
import Icon, { Icons } from "../../elements/Icon";
import { Colors } from "../../styles/Colors";
import * as Polished from "polished";
import moment from "moment";
import Loader from "../../elements/Loader";
import {
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "./Modal";
import AudioFileRow from "../AudioFileRow";

const Container = styled.div`
  width: 600px;
`;

const Dropzone = styled.div`
  position: relative;
  width: 100%;
  height: 400px;
  border-radius: 5px;
  background-color: ${Colors.BlueHighlight};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;

  &:hover {
    cursor: pointer;
    background-color: ${Polished.lighten(0.01, Colors.BlueHighlight)};
  }

  &:focus {
    outline: none;
  }

  &:active {
    outline: none;
    background-color: ${Polished.darken(0.01, Colors.BlueHighlight)};
  }
`;

const DropzoneText = styled.div`
  font-size: 1.4rem;
  color: ${Colors.Blue};
  font-weight: 600;
  text-transform: uppercase;
  margin-top: 15px;
`;

const AudioFiles = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 5px;
  background-color: ${Colors.White};
  /* background-color: ${Colors.BlueHighlight}; */
  display: flex;
  flex-direction: column;
  transition: all 0.2s;
  overflow: scroll;
  border: 1px solid ${Colors.Grey6};

`;

const ErrorText = styled.div`
  color: ${Colors.Red};
  font-size: 1.2rem;
  font-weight: 600;
  margin: 20px 0;
  text-align: center;
`;

const Spacer = styled.div`
  height: 20px;
`;

const schema = Joi.object({
  files: Joi.array()
    .required()
    .error(([error]) => {
      const message = "Please select atleast one file for upload.";
      return new Error(
        JSON.stringify({
          field: error.path[0],
          message,
        })
      );
    }),
});

type UploadFilesModalProps = {};

const UploadFilesModal: React.FC<UploadFilesModalProps> = () => {
  /* State */
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [files, setFiles] = React.useState<File[]>([]);

  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrorsInternal] = useState({
    name: null,
    description: null,
  });

  /* Actions */
  const dispatch = useDispatch();
  const popModal = () => dispatch(AppActions.popModal());

  const eventHandler = makeEventHandler(() => setError(""));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message,
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangeName = eventHandler((value: string) => {
    setFieldErrors("name", null);
    setName(value);
  });

  const onChangeDescription = eventHandler((value: string) => {
    setFieldErrors("description", null);
    setDescription(value);
  });

  /* GraphQL */
  const [uploadFilesMutation] = useMutation(UPLOAD_FILES, {
    variables: {
      files,
    },
    refetchQueries: [
      // {
      //   query: LIST_PROJECTS,
      // },
    ],
    onError: async (error) => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      console.log(errorMsg);
      setError(errorMsg);
    },
  });

  const uploadFiles = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const params = schema.validate({
      files,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError("");
    uploadFilesMutation();
  };

  /** Hooks */
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: setFiles,
    accept: ["audio/*"],
  });

  /** Render */
  return (
    <ModalContainer>
      <ModalHeader
        title={`Upload Files ${
          Boolean(files.length) ? `(${files.length})` : ""
        }`}
        close={popModal}
      />
      <ModalContent>
        <Container>
          {(() => {
            if (loading) {
              return (
                <Dropzone>
                  <Loader color={Colors.Blue} />
                </Dropzone>
              );
            }

            if (!files.length) {
              return (
                <Dropzone {...getRootProps()}>
                  <input {...getInputProps()} />
                  <Icon icon={Icons.Upload} color={Colors.Blue} size={36} />
                  <DropzoneText>
                    Drop audio files or click here to browse
                  </DropzoneText>
                </Dropzone>
              );
            }

            return (
              <AudioFiles>
                {files.map((file: File, index) => {
                  return <AudioFileRow key={index} file={file} />;
                })}
              </AudioFiles>
            );
          })()}
          {error && <ErrorText>{error}</ErrorText>}
        </Container>
      </ModalContent>
      <ModalFooter>
        <div />
        <Button
          type={ButtonTypes.Submit}
          onClick={() => uploadFiles()}
          text="Upload Files"
          width="180px"
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export default UploadFilesModal;
