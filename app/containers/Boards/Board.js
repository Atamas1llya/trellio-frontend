import React, { Component } from 'react';
import { connect } from 'react-redux';

import BoardComponent from '../../components/Boards/Board';
import Task from './Task';
import CreateTask from '../../components/Boards/tasks/CreateTask';

import { updateBoard } from '../../actions/api/boards';

class Board extends Component {
  state = {
    saveTitleTimeout: false,
  }

  updateBoardTitle(e) {
    const { board, token } = this.props;
    let { saveTitleTimeout } = this.state;

    const { value } = e.target;

    clearTimeout(saveTitleTimeout);

    this.props.updateBoardLocally({ // User will not wait
      _id: board._id,
      update: {
        title: value
      }
    });

    saveTitleTimeout = setTimeout(() => { // Data saved
      this.props.updateBoard({
        _id: board._id,
        update: {
          title: value
        }
      }, token);
    }, 500);

    this.setState({ saveTitleTimeout }); // Profit. Little wierd profit
  }

  render() {
    const { token, board, tasks } = this.props;
    return (
      <BoardComponent
        title={board.title}
        updateTitle={e => this.updateBoardTitle(e)}
      >
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

const mapDispatch = dispatch => ({
  updateBoard: (params, token) => dispatch(updateBoard(params, token)),
  updateBoardLocally: ({ _id, update }) => dispatch({ type: 'UPDATE_BOARD', _id, update }),
});

export default connect(mapState, mapDispatch)(Board);
