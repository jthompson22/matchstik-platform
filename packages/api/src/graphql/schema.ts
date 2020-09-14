import { GraphQLDateTime } from 'graphql-iso-date';
import gql from "graphql-tag";
import { makeExecutableSchema } from "graphql-tools";
import { GraphQLUpload } from "graphql-upload";
import { merge } from "lodash";
import fileUploadResolvers from "./resolvers/fileUpload.resolvers";
import organizationResolvers from "./resolvers/organization.resolvers";
import userResolvers from "./resolvers/user.resolvers";

const schema = gql`
  scalar Upload
  scalar GraphQLDateTime

  ######################################################################
  # User
  ######################################################################

  type User {
    _id: String
    firstName: String
    lastName: String
    email: String
    phoneNumber: String
    createdAt: Float
    organizationId: String
    organization: Organization
  }

  input UserInput {
    firstName: String!
    lastName: String!
    email: String!
    phoneNumber: String
    password: String!
  }

  type Authentication {
    user: User!
    token: String!
  }

  ######################################################################
  # Organization
  ######################################################################

  type Organization {
    _id: String
    userId: String
    user: User
    active: Boolean
    name: String
    description: String
    phoneNumber: String
    email: String
    address: String
    logoUrl: String
  }

  input OrganizationInput {
    _id: String
    name: String
    description: String
    phoneNumber: String
    email: String
    address: String
    logoUrl: String
  }

  ######################################################################
  # Miscellaneous
  ######################################################################

  type File {
    filename: String!
    mimetype: String!
    encoding: String!
    url: String!
  }

  type MetaData {
    createdAt: GraphQLDateTime
    createdBy: String
    lastUpdatedAt: GraphQLDateTime
    lastUpdatedBy: String
  }

  ######################################################################
  # Queries and Mutations
  ######################################################################

  type Query {
    # User
    user: User

    # Organization
    organization(organizationId: String): Organization

    # Project
    # project(projectId: String): Project
    # projects: [Project]
  }

  type Mutation {
    # User
    register(user: UserInput!): Authentication
    login(email: String!, password: String!): Authentication
    sendPasswordReset(email: String!): Boolean
    resetPassword(resetPasswordCode: String!, password: String!): Authentication
    verifyEmail(verifyEmailCode: String!): Boolean

    # Organization
    updateOrganization(organization: OrganizationInput!): Organization
    deleteOrganization(organizationId: String!): Boolean

    # Miscellaneous
    uploadFiles(files: [Upload!]!): [File!]!

    # # Project
    # createProject(project: ProjectInput!): Project
  }
`;

export const resolvers = merge(
  userResolvers,
  organizationResolvers,
  fileUploadResolvers,
);

export const executableSchema = makeExecutableSchema({
  resolvers: {
    Upload: GraphQLUpload,
    GraphQLDateTime: GraphQLDateTime,
    User: {
      organization: (user, args, context) => organizationResolvers.Query.organization(null, { organizationId: user.organizationId }, context),
    },
    Organization: {
      user: (org, args, context) => userResolvers.Query.user(org, null, context),
    },
    ...resolvers,
  },
  typeDefs: schema
});
