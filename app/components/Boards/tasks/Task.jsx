import React from 'react';
import InlineEdit from 'react-edit-inline';

export default ({ title, authorized, completed, ...actions }) => {
  const editableTitle = (
    <InlineEdit
      activeClassName="inline-input"
      text={title || 'Title here'}
      paramName="title"
      change={e => actions.updateTitle(e)}
    />
  );

  if (authorized) {
    if (completed) {
      return (
        <div className="task completed fadeIn animated">
          <span className="title">{ editableTitle }</span>
          <span className="actions">
            <i
              className="material-icons icon-renew"
              onClick={actions.activateTask}
            >replay</i>
            <i
              className="material-icons icon-delete"
              onClick={actions.deleteTask}
            >close</i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="task fadeIn animated">
          <span className="title">{ editableTitle }</span>
          <span className="actions">
            <i
              className="material-icons icon-done"
              onClick={actions.completeTask}
            >done</i>
            <i
              className="material-icons icon-delete"
              onClick={actions.deleteTask}
            >close</i>
          </span>
        </div>
      );
    }
  } else {
    return (
      <div className="task fadeIn animated">
        <span className="title">{ title }</span>
      </div>
    );
  }
};
