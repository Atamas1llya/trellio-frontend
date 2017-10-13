import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getBoards } from '../../actions/api/boards';

import BoardsComponent from '../../components/Boards';

import Board from './Board';
import CreateBoard from '../../components/Boards/CreateBoard';

class Boards extends Component {
  componentDidMount() {
    this.props.getBoards();
  }
  render() {
    const { boards, token } = this.props;
    return (
      <div>
        <BoardsComponent>
          {
            boards.map((board) => {
              return <Board board={board} tasks={board.tasks} key={board._id} />
            })
          }
          { token && <CreateBoard /> }
        </BoardsComponent>
      </div>
    );
  }
};

const mapState = ({ token, boards }) => ({
  token,
  boards
});

const mapDispatch = dispatch => ({
  getBoards: () => dispatch(getBoards()),
});

export default connect(mapState, mapDispatch)(Boards);
