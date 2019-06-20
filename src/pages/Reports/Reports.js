import React from 'react';
import { useQuery, useSubscription } from 'react-apollo-hooks';
import { Container } from 'react-bootstrap';

import { GET_REPORTS, SUBSCRIBE_TO_REPORTS_CHANGED } from './graphql';
import Report from '../../components/Report';

function Reports() {
  useReportsSubscription();
  const { reports, loading, error } = useReports();
  if (loading) {
    return <div>Loading</div>;
  }
  return (
    <Container>
      {reports.map(
        r =>
          !r.isResolved &&
          r.state !== 'CLOSED' && <Report key={r.id} report={r} />,
      )}
    </Container>
  );
}

function useReports() {
  const { data: { getReports = {} } = {}, loading, error } = useQuery(
    GET_REPORTS,
  );
  return { loading, error, reports: getReports || [] };
}

function useReportsSubscription() {
  const { data: { reportChanged = {} } = {}, loading, error } = useSubscription(
    SUBSCRIBE_TO_REPORTS_CHANGED,
    {
      onSubscriptionData: ({
        client: { cache },
        subscriptionData: {
          data: { reportChanged },
        },
      }) => {
        if (
          reportChanged &&
          (reportChanged.state === 'CLOSED' || reportChanged.isResolved)
        ) {
          const { getReports } = cache.readQuery({ query: GET_REPORTS });
          cache.writeQuery({
            query: GET_REPORTS,
            data: {
              getReports: getReports.filter(r => r.id !== reportChanged.id),
            },
          });
        }
      },
    },
  );
  return { reportChanged };
}

export default Reports;
