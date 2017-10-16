import React from 'react';
import InlineEdit from 'react-edit-inline';

const TaskTitle = ({ title, status, updateTitle }) => (
  <span className="brand">
    <InlineEdit
      activeClassName="inline-input"
      text={title || 'New task'}
      paramName="title"
      className={status === 'complete' ? 'task-info-title completed' : null }
      change={e => updateTitle(e)}
    />
  </span>
);

export default TaskTitle;
