import _ from 'lodash';

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARDS': {
      return action.boards;
      // return _.unionBy(action.boards, state, "__v");
    }
    case 'CREATE_BOARD': {
      return [
        ...state,
        action.board,
      ];
    }
    case 'UPDATE_BOARD': {
      return state.map((board) => {
        if (board._id === action._id) {
          return {
            ...board,
            ...action.update,
          }
        }
        return board;
      })
    }
    case 'DELETE_BOARD': {
      return action.boards.filter((board) => board._id !== action._id);
    }
    default: return state;
  }
}
