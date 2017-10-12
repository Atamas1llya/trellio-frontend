const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOARDS':
      return action.boards;
      break;
    default:
      return state;
  }
}
