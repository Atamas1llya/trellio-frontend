import Fetcher from '../wrappers/Fetcher';
import alertify from 'alertify.js';

export const signup = (credentials) => (dispatch) => {
  Fetcher('/signup', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => {
      dispatch({
        type: 'SET_TOKEN',
        token: res.token,
      });
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: null,
      });
      dispatch({
        type: 'SET_USER',
        user: res.user,
      });
      alertify.alert(res.message);
    })
    .catch((err) => {
      alertify.alert(err.message)
    })
}

export const login = (credentials) => (dispatch) => {
  Fetcher('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => {
      dispatch({
        type: 'SET_TOKEN',
        token: res.token,
      });
      dispatch({
        type: 'TOGGLE_MODAL',
        modal: null,
      });
      dispatch({
        type: 'SET_USER',
        user: res.user,
      });
    })
    .catch((err) => {
      alertify.alert(err.message)
    })
}
