import alertify from 'alertify.js';
import uuidV1 from 'uuid/v1';

import Fetcher from '../wrappers/Fetcher';

export const getTasks = () => dispatch => {
  Fetcher(`/boards/tasks`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch({
        type: 'GET_TASKS',
        tasks: res.tasks,
      });
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const getBoardTasks = (_id) => dispatch => {
  Fetcher(`/boards/${_id}/tasks`, {
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      dispatch({
        type: 'GET_BOARD_TASKS',
        board_id: _id,
        tasks: res.tasks,
      });
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const createTask = (task, token) => dispatch => {
  dispatch({
    type: 'CREATE_TASK',
    task,
  });

  Fetcher(`/boards/${task.board}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(task),
  })
    .then((res) => {
      dispatch(getBoardTasks(task.board))
    })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const updateTask = (_id, update, token) => dispatch => {
  dispatch({
    type: 'UPDATE_TASK',
    _id,
    update,
  });

  Fetcher(`/boards/tasks/${_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(update),
  })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const moveTask = (task_id, board_to, token) => dispatch => {
  dispatch({
    type: 'MOVE_TASK',
    task_id: task_id,
    board_id: board_to,
  });

  dispatch(updateTask(
    task_id,
    {
      board: board_to,
    },
    token,
  ));
}

export const attachImage = (_id, upload, token) => dispatch => {
  return new Promise((resolve, reject) => {
    Fetcher(`/boards/tasks/${_id}/attachment`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(upload),
    })
      .then((res) => {
        dispatch({
          type: 'ATTACH_TASK_IMAGE',
          url: res.url,
          _id,
        });
        resolve();
      })
      .catch((err) => {
        console.error(err);
        alertify.alert(err.message);
        reject(err.message);
      });
  });
}

export const deleteTask = (_id, token) => dispatch => {
  dispatch({
    type: 'DELETE_TASK',
    _id,
  });

  Fetcher(`/boards/tasks/${_id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}

export const updateTaskStatus = (_id, status, token) => dispatch => {
  dispatch({
    type: 'UPDATE_TASK_STATUS',
    _id,
    status,
  });

  Fetcher(`/boards/tasks/${_id}/${status}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  })
    .catch((err) => {
      console.error(err);
      alertify.alert(err.message)
    });
}
