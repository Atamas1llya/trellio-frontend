import React, { Component } from 'react';

import { getTasks } from '../actions/api/tasks';

import BoardComponent from '../components/Board';
import Task from './Task';

class Board extends Component {
  state = {
    tasks: [],
  }

  componentDidMount() {
    this.getTasks();
  }

  getTasks() {
    const { _id } = this.props.board;
    getTasks(_id)
      .then((tasks) => {
        this.setState({ tasks });
      })
  }

  render() {
    const { tasks } = this.state;
    return (
      <BoardComponent title={this.props.board.title}>
        {
          tasks.map((task) => {
            return <Task task={task} key={task._id} />
          })
        }
      </BoardComponent>
    );
  }
};

export default Board;
