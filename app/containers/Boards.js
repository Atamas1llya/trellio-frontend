import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoards } from '../actions/api/boards';
import { getTasks } from '../actions/api/tasks';

import BoardsComponent from '../components/Boards';

import Board from './Board';

class Boards extends Component {
  componentDidMount() {
    this.props.getBoards();
  }

  render() {
    return (
      <div>
        <BoardsComponent>
          {
            this.props.boards.map((board) => {
              return <Board board={board} key={board._id} />
            })
          }
        </BoardsComponent>
      </div>
    );
  }
};

const mapState = ({ boards }) => ({
  boards,
});

const mapDispatch = dispatch => ({
  getBoards: () => dispatch(getBoards()),
});

export default connect(mapState, mapDispatch)(Boards);
