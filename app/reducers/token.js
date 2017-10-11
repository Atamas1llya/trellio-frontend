const initialState = localStorage.getItem('token');

export default (state = initialState, action) => {
  if (action.type === 'SET_TOKEN') {
    localStorage.setItem('token', action.token);
    return action.token;
  } else if (action.type === 'DELETE_TOKEN') {
    localStorage.removeItem('token');
    return null;
  }

  return state;
}
