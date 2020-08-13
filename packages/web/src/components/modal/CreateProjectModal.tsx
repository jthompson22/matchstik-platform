import React, { useState } from "react";
import styled from "styled-components";
import Joi from "@hapi/joi";
import { useMutation } from '@apollo/react-hooks';
import CREATE_PROJECT from '../../graphql/mutations/createProject.mutation';
import LIST_PROJECTS from "../../graphql/queries/projects.query";
import {  useDispatch } from "react-redux";
import * as AppActions from "../../redux/actions/app.actions";
import * as ErrorUtil from "../../utils/ErrorUtil";
import makeEventHandler from "../../utils/makeEventHandler";
import Button, { ButtonTypes } from "../../elements/Button";
import LabeledInput from "../../elements/LabeledInput";
import { Colors } from "../../styles/Colors";
import {
  ModalContainer,
  ModalHeader,
  ModalContent,
  ModalFooter,
} from "./Modal";

const Container = styled.div`
  width: 400px;
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
  name: Joi.string().required().error(([error]) => {
    const message = "Project name is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  description: Joi.string().required().error(([error]) => {
    const message = "Project description is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
});

type CreateProjectModalProps = {}

const CreateProjectModal: React.FC<CreateProjectModalProps> = () => {
  /* State */
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

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
  const [createProjectMutation, { loading }] = useMutation(CREATE_PROJECT, {
    variables: {
      project: {
        name,
        description,
      },
    },
    refetchQueries: [
      {
        query: LIST_PROJECTS,
      },
    ],
    onError: async (error) => {
      const errorMsg = ErrorUtil.getErrorMessage(error);
      setError(errorMsg);
    },
  });

  const createProject = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const params = schema.validate({
      name,
      description,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError("");
    createProjectMutation();
  };

  /** Render */
  return (
    <ModalContainer>
      <ModalHeader title="Create Project" close={popModal} />
      <ModalContent>
        <Container>
          <LabeledInput
            autoFocus
            label="Project Name"
            placeholder=""
            value={name}
            onChange={onChangeName}
            error={fieldErrors["name"]}
          />
          <Spacer />
          <LabeledInput
            label="Project Description"
            placeholder=""
            value={description}
            onChange={onChangeDescription}
            error={fieldErrors["description"]}
          />
          {error && <ErrorText>{error}</ErrorText>}
        </Container>
      </ModalContent>
      <ModalFooter>
        <div />
        <Button
          type={ButtonTypes.Submit}
          onClick={() => createProject()}
          text="Create Project"
          width="180px"
        />
      </ModalFooter>
    </ModalContainer>
  );
};

export default CreateProjectModal;
