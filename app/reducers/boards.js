const initialState = [];

export default (state = initialState, action) => {
  if (action.type === 'GET_BOARDS') {
    return action.boards;
  }

  return state;
}
