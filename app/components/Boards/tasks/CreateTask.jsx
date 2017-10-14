import React from 'react';


export default ({ title, authorized, completed, ...actions }) => {
  return (
    <div className="task create" onClick={actions.createTask}>
      <span className="title"><i className="material-icons">add</i></span>
    </div>
  );
};
