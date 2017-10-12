import React from 'react';

export default ({ title, authorized, completed, ...actions }) => {
  if (authorized) {
    if (completed) {
      return (
        <div className="task completed">
          <span className="title">{ title }</span>
          <span className="actions">
            <i
              className="material-icons action-done"
              onClick={actions.activateTask}
            >replay</i>
            <i
              className="material-icons action-delete"
              onClick={actions.deleteTask}
            >close</i>
          </span>
        </div>
      );
    } else {
      return (
        <div className="task">
          <span className="title">{ title }</span>
          <span className="actions">
            <i
              className="material-icons action-done"
              onClick={actions.completeTask}
            >done</i>
            <i
              className="material-icons action-delete"
              onClick={actions.deleteTask}
            >close</i>
          </span>
        </div>
      );
    }
  } else {
    return (
      <div className="task">
        <span className="title">{ title }</span>
      </div>
    );
  }
};
