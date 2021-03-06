import React, { Component } from 'react';
import InlineEdit from 'react-edit-inline';

import { Panel, Col } from 'react-bootstrap';

const Board = ({ title, children, authorized, ...actions }) => {
  const editableTitle = (
    <span>
      <InlineEdit
        activeClassName="panel-title inline-input"
        text={title || 'Title here'}
        paramName="title"
        change={e => actions.updateTitle(e)}
      />
      <i className="material-icons icon-delete" onClick={actions.deleteBoard}>close</i>
    </span>
  )

  return (
    <Col xs={12} md={6} lg={3}>
      <Panel
        className="board"
        header={ authorized ? editableTitle : title }
        onDragOver={actions.onDragOver}
        onDrop={actions.onDrop}
      >
        { children }
      </Panel>
    </Col>
  );
}

export default Board;
