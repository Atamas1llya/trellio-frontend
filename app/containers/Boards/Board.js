import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

class Board extends Component {
  render() {
    const { token, board, tasks } = this.props;
    return (
      <BoardComponent title={board.title}>
        {
          tasks.map((task) => {
            return (
              <Task
                task={task}
                board_id={this.props.board._id}
                key={task._id}
              />
            )
          })
        }
        { token && <CreateTask /> }
      </BoardComponent>
    );
  }
};

const mapState = ({ token, tasks }, { board }) => ({
  token,
  tasks: tasks.filter(task => task.board === board._id),
});

export default connect(mapState)(Board);
