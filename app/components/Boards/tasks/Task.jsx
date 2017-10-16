import React from 'react';
import InlineEdit from 'react-edit-inline';
import { Link } from 'react-router';

export default ({ _id, title, authorized, completed, attachments = [], dueDate, ...actions }) => {
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
        <div
          className="task completed fadeIn animated"
          draggable="true"
          onDragStart={actions.onDragStart}
        >
          <span className="title">
            <span className="title-text">
              { editableTitle }
            </span>
            <span className="task-state-pics">
              { attachments.length > 0 && <i className="material-icons task-state-pic">image</i> }
              { dueDate && <i className="material-icons task-state-pic">timer</i> }
            </span>
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
        <div
          className="task fadeIn animated"
          draggable="true"
          onDragStart={actions.onDragStart}
        >
          <span className="title">
            <span className="title-text">
              { editableTitle }
            </span>
            <span className="task-state-pics">
              { attachments.length > 0 && <i className="material-icons task-state-pic">image</i> }
              { dueDate && <i className="material-icons task-state-pic">timer</i> }
            </span>
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
      <Link to={`/boards/tasks/${_id}`}>
        <div className="task fadeIn animated">
          <span className="title">
            <span className="title-text">
              { title }
            </span>
          </span>
        </div>
      </Link>
    );
  }
};
