import React, { Component } from 'react';

import BoardComponent from '../components/Board';
import Task from './Task';
import CreateTask from '../components/CreateTask';

class Board extends Component {
  render() {
    const { board, tasks } = this.props;
    return (
      <BoardComponent title={board.title}>
        {
          board.tasks.map((task) => {
            return (
              <Task
                task={task}
                board_id={this.props.board._id}
                key={task._id}
              />
            )
          })
        }
        <CreateTask />
      </BoardComponent>
    );
  }
};

export default Board;
