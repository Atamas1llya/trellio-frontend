import React from 'react';


export default ({ title, authorized, completed, ...actions }) => {
  return (
    <div className="task create">
      <span className="title"><i className="material-icons">add</i></span>
    </div>
  );
};
