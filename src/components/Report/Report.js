import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useMutation } from 'react-apollo-hooks';

import { UPDATE_REPORT } from './graphql';

function Report({
  report: {
    id,
    state,
    payload: { reportType, message },
    isResolved,
  },
}) {
  return (
    <Container>
      <Row>
        <Col>
          <Row>Id: {id}</Row>
          <Row>State: {state}</Row>
          <Row>
            <Button variant="link">Details</Button>
          </Row>
        </Col>
        <Col>
          <Row>Type: {reportType}</Row>
          <Row>Message: {message}</Row>
        </Col>
        <Col>
          <Row>
            <Button
              variant="light"
              onClick={useMutation(UPDATE_REPORT, {
                variables: {
                  updateReportInput: {
                    id: id,
                    state: 'CLOSED',
                  },
                },
              })}
            >
              Block
            </Button>
          </Row>
          <Row>
            <Button
              variant="light"
              onClick={useMutation(UPDATE_REPORT, {
                variables: {
                  updateReportInput: {
                    id: id,
                    state: 'OPEN',
                    isResolved: true,
                  },
                },
              })}
            >
              Resolve
            </Button>
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

Report.propTypes = {};

export default Report;
