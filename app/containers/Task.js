import React, { Component } from 'react';

import TaskComponent from '../components/Task';

class Task extends Component {
  render() {
    return (
      <TaskComponent
        {...this.props.task}
      />
    );
  }
};

export default Task;
