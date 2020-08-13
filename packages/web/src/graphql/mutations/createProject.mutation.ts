import gql from 'graphql-tag';

const mutation = gql`
  mutation CreateProject($project: ProjectInput!) {
    createProject(project: $project) {
      _id
      organizationId
      name
      description
      meta {
        createdAt
        createdBy
        lastUpdatedAt
        lastUpdatedBy
      }
    }
  }
`;

export default mutation;
