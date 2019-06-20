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
      isResolved
      created
    }
  }
`;

export const SUBSCRIBE_TO_REPORTS_CHANGED = gql`
  subscription reportChanged {
    reportChanged {
      state
      isResolved
      id
    }
  }
`;
