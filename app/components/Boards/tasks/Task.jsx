import React from 'react';
import InlineEdit from 'react-edit-inline';
import { Link } from 'react-router';

export default ({ _id, title, authorized, completed, ...actions }) => {
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
          <span className="title">
            { editableTitle }
          </span>
          <span className="actions">
            <i
              className="material-icons icon-renew"
              onClick={actions.activateTask}
            >replay</i>
            <i
              className="material-icons icon-delete"
              onClick={actions.deleteTask}
            >close</i>
            <Link to={`/boards/tasks/${_id}`}>
              <i className="material-icons icon-link">open_in_new</i>
            </Link>
          </span>
        </div>
      );
    } else {
      return (
        <div className="task fadeIn animated">
          <span className="title">
            { editableTitle }
          </span>
          <span className="actions">
            <i
              className="material-icons icon-done"
              onClick={actions.completeTask}
            >done</i>
            <i
              className="material-icons icon-delete"
              onClick={actions.deleteTask}
            >close</i>
            <Link to={`/boards/tasks/${_id}`}>
              <i className="material-icons icon-link">open_in_new</i>
            </Link>
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
