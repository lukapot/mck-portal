import gql from 'graphql-tag';

export const UPDATE_REPORT = gql`
  mutation updateReport($updateReportInput: UpdateReportInput!) {
    updateReport(updateReportInput: $updateReportInput) {
      id
    }
  }
`;
