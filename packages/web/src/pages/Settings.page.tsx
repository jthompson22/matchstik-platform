import React from 'react';
import styled from 'styled-components';
import { useQuery, useMutation } from "@apollo/react-hooks";
import { useSelector, useDispatch } from "react-redux";
import { MatchstikState } from "../redux/store";
import * as AppActions from "../redux/actions/app.actions";
import { Link } from 'react-router-dom';
import { PageHeader, PageTitle } from '../components/PageHeader';
import { Colors } from '../styles/Colors';
import gql from 'graphql-tag';
import { Title } from '../components/DashboardLayout';
import MainNavigation from '../components/MainNavigation';
import PageLoader from '../components/PageLoader';
import Loader, { LoaderSizes } from '../elements/Loader';
import LabeledInput from '../elements/LabeledInput';
import Joi from "@hapi/joi";
import * as Schema from "../utils/Schema";
import * as ErrorUtil from "../utils/ErrorUtil";
import makeEventHandler from "../utils/makeEventHandler";
import ErrorText from "../elements/ErrorText";
import TextArea from "../elements/TextArea";
import Button, { ButtonTypes } from "../elements/Button";
import IOrganization from "@matchstik/models/.dist/interfaces/IOrganization";

const GET_USER = gql`
  query User {
    user {
      organization {
        _id
        userId
        active
        name
        description
        phoneNumber
        email
        address
      }
    }
  }
`;

const UPDATE_ORGANIZATION = gql`
  mutation UpdateOrganization($organization: OrganizationInput!) {
    updateOrganization(organization: $organization) {
      _id
      userId
      active
      name
      description
      phoneNumber
      email
      address
    }
  }
`;

const schema = Joi.object({
  name: Schema.organization.name().error(([error]) => {
    const message = "Organization name is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  email: Schema.organization.email().error(([error]) => {
    const message = "Organization email is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  phoneNumber: Schema.organization.phoneNumber().error(([error]) => {
    const message = "Organiztion phone number is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  description: Schema.organization.description().error(([error]) => {
    const message = "Organization description is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  address: Schema.organization.address().error(([error]) => {
    const message = "Organization address is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
  logoUrl: Schema.organization.logoUrl().error(([error]) => {
    const message = "Organization logo is invalid";
    return new Error(
      JSON.stringify({
        field: error.path[0],
        message,
      })
    );
  }),
});

const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: fill-available;
  height: calc(100% - 300px);
`;

const Content = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Spacer = styled.div`
  height: 30px;
`;

enum ErrorKeyEnum {
  Name = "name",
  Email = "email",
  PhoneNumber = "phoneNumber",
  Description = "description",
  Address = "address",
  LogoUrl = "logoUrl",
}

type SettingsPageProps = {};

const SettingsPage: React.FC<SettingsPageProps> = ({}) => {
  /* State */
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phoneNumber, setPhoneNumber] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [logoUrl, setLogoUrl] = React.useState("");

  const [error, setError] = React.useState("");
  const [fieldErrors, setFieldErrorsInternal] = React.useState({
    [ErrorKeyEnum.Name]: null,
    [ErrorKeyEnum.Email]: null,
    [ErrorKeyEnum.PhoneNumber]: null,
    [ErrorKeyEnum.Description]: null,
    [ErrorKeyEnum.Address]: null,
    [ErrorKeyEnum.LogoUrl]: null,
  });

  /* Actions */
  const eventHandler = makeEventHandler(() => setError(""));

  const setFieldErrors = (field: string, message: string | null) => {
    const newFieldErrors: any = {
      [field]: message,
    };
    setFieldErrorsInternal(newFieldErrors);
  };

  const onChangeName = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.Name, null);
    setName(value);
  });
  const onChangeEmail = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.Email, null);
    setEmail(value);
  });
  const onChangePhoneNumber = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.PhoneNumber, null);
    setPhoneNumber(value);
  });
  const onChangeDescription = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.Description, null);
    setDescription(value);
  });
  const onChangeAddress = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.Address, null);
    setAddress(value);
  });
  const onChangeLogoUrl = eventHandler((value: string) => {
    setFieldErrors(ErrorKeyEnum.LogoUrl, null);
    setLogoUrl(value);
  });

  /* GraphQL */
  const { data, loading } = useQuery(GET_USER, {
    onCompleted: (data) => {
      const organization: IOrganization = data?.user?.organization;
      if (organization) {
        setName(organization.name || "");
        setEmail(organization.email || "");
        setPhoneNumber(organization.phoneNumber || "");
        setDescription(organization.description || "");
        setAddress(organization.address || "");
        setLogoUrl(organization.logoUrl || "");
      }
    },
  });

  const [updateOrganizationMutation, { loading: updateLoading }] = useMutation(
    UPDATE_ORGANIZATION,
    {
      variables: {
        name,
        email,
        phoneNumber,
        description,
        address,
        logoUrl,
      },
      onCompleted: async ({ login: { token } }) => {
        // await Auth.setToken(token);
        // history.push("/dashboard/overview");
      },
      onError: async (error: any) => {
        const errorMsg = ErrorUtil.getErrorMessage(error);
        setError(errorMsg);
      },
    }
  );

  const updateOrganization = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    const params = schema.validate({
      name,
      email,
      phoneNumber,
      description,
      address,
      logoUrl,
    });

    const { error: schemaError } = params;

    if (schemaError) {
      const { field, message } = JSON.parse(schemaError.message);
      setFieldErrors(field, message);
      return;
    }

    setError("");
    updateOrganizationMutation();
  };

  /* Render */
  return (
    <Container>
      <Title>Settings</Title>
      <MainNavigation />
      <LoaderContainer>
        {loading && <Loader size={LoaderSizes.Large} />}
        {!loading && (
          <Content>
            <LabeledInput
              label="Name"
              placeholder="Enter Name"
              value={name}
              type="text"
              onChange={onChangeName}
              error={fieldErrors[ErrorKeyEnum.Name]}
              width="270px"
            />
            <Spacer />
            <LabeledInput
              label="Email Address"
              placeholder="Enter Email Address"
              value={email}
              type="text"
              onChange={onChangeEmail}
              error={fieldErrors[ErrorKeyEnum.Email]}
              width="270px"
            />
            <Spacer />
            <LabeledInput
              label="Phone Number"
              placeholder="Enter Phone Number"
              value={phoneNumber}
              type="text"
              onChange={onChangePhoneNumber}
              error={fieldErrors[ErrorKeyEnum.PhoneNumber]}
              width="270px"
            />
            <Spacer />
            <LabeledInput
              label="Address"
              placeholder="Enter Physical Address"
              value={address}
              type="text"
              onChange={onChangeAddress}
              error={fieldErrors[ErrorKeyEnum.Address]}
              width="340px"
            />
            <Spacer />
            <TextArea
              label="Description"
              placeholder="Organization Description"
              value={description}
              onChange={onChangeDescription}
              error={fieldErrors[ErrorKeyEnum.Description]}
              width="670px"
              height="430px"
            />
            <Spacer />
            {error && <ErrorText>{error}</ErrorText>}
            <Button
              type={ButtonTypes.Submit}
              onClick={() => console.log()}
              loading={loading}
              text="Save Settings"
              margin="0"
              width="300px"
            />
          </Content>
        )}
      </LoaderContainer>
    </Container>
  );
};

export default SettingsPage;
