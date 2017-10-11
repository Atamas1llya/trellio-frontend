const initialState = {
  active: null,
};

export default (state = initialState, action) => {
  if (action.type === 'TOGGLE_MODAL') {
    return {
      active: action.modal,
    };
  }
  return state;
}
