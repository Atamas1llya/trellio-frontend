const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARDS': {
      return action.boards;
    }
    case 'DELETE_BOARD': {
      return action.boards.filter((board) => board._id !== action._id);
    }
    default: return state;
  }
}
