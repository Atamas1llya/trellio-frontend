import { push } from 'react-router-redux';
import { apiHost } from '../../../config';
import alertify from 'alertify.js';

const Fetcher = (url, settings, dispatch) => {
  return new Promise((resolve, reject) => {
    let ok;

    fetch(apiHost + url, settings)
      .then((res) => {
        if (res.status === 403) {
          dispatch({ type: 'DELETE_TOKEN' });
        }
        ok = res.ok;
        return res.json();
      })
      .then((json) => {
        if (ok) {
          resolve(json);
        } else {
          alertify.error(json.message);
          reject(json);
        }
      })
  });
}

export default Fetcher;
