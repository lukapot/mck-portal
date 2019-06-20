import gql from 'graphql-tag';

export const GET_REPORTS = gql`
  {
    getReports {
      id
      source
      sourceIdentityId
      reference {
        referenceId
        referenceType
      }
      state
      payload {
        source
        reportType
        message
        reportId
        referenceResourceId
        referenceResourceType
      }
      created
    }
  }
`;
