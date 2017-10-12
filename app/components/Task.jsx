import React from 'react';

import { ListGroupItem } from 'react-bootstrap';

export default ({ title }) => {
  return (
    <div className="task">
      <span className="title">{ title }</span>
    </div>
  )
};
