import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';

import { Panel, Col } from 'react-bootstrap';

const Board = ({ title, children, ...actions }) => {
  const editableTitle = (
    <span>
      <InlineEdit
        activeClassName="panel-title inline-input"
        text={title || 'Title here'}
        paramName="title"
        change={e => actions.updateTitle(e)}
      />
      <i className="material-icons icon-delete">close</i>
    </span>
  )

  return (
    <Col xs={12} md={5} lg={3}>
      <Panel className="board" header={editableTitle}>
        { children }
      </Panel>
    </Col>
  );
}

export default Board;
