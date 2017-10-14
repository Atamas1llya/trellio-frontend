import React from 'react';

import { Panel, Col } from 'react-bootstrap';

export default ({ authorized, ...actions }) => {
  if (authorized) {
    return (
      <Col xs={12} md={5} lg={3}>
        <Panel className="board create fadeIn animated" onClick={actions.createBoard}>
          <i className="material-icons">add</i>
        </Panel>
      </Col>
    );
  } else {
    return (
      <Col xs={12} md={5} lg={3}>
        <Panel className="board create fadeIn animated" onClick={actions.openLoginModal}>
          <i className="material-icons">add</i>
          <span><b>Sign in</b> to create new board</span>
        </Panel>
      </Col>
    );
  }
};
