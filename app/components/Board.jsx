import React from 'react';

import { Panel, Col } from 'react-bootstrap';

export default ({ title, children }) => {
  return (
    <Col xs={12} md={5} lg={3}>
      <Panel className="board" header={title}>
          { children }
      </Panel>
    </Col>
  );
};
