import React from 'react';
import InlineEdit from 'react-edit-inline';

const TaskDescription = ({ description, status, updateDescription }) => (
  <InlineEdit
    activeClassName="inline-input"
    text={description || 'Description is not provided...'}
    paramName="description"
    className={status === 'complete' ? 'task-info-description completed' : null }
    change={e => updateDescription(e)}
  />
);

export default TaskDescription;
