import React from 'react';
import moment from 'moment';

const DueDate = ({ dueDate }) => {
  const momentConfig = {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'L'
  }

  if (dueDate) {
    return (
      <span className="task-expires">
        Due date:
        <span className="date"> { moment(dueDate).calendar(null, momentConfig) }</span>
      </span>
    );
  }
  return null;
};

export default DueDate;
