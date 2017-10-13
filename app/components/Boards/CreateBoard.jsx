import React from 'react';

import { Panel, Col } from 'react-bootstrap';

export default () => {
  return (
    <Col xs={12} md={5} lg={3}>
      <Panel className="board create">
          <i className="material-icons">add</i>
      </Panel>
    </Col>
  );
};
