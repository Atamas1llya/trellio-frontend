const initialState = '';

export default (state = initialState, action) => {
  if (action.type === 'DRAG_TASK') {
    return action._id;
  }
  return state;
}
