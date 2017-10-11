const initialState = {};

export default (state = initialState, action) => {
  if (action.type === 'SET_USER') {
    return action.user;
  } else if (action.type === 'DELETE_USER') {
    return null;
  }

  return state;
}
