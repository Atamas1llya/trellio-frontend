const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case 'GET_TASKS': {
      return action.tasks;
    }
    case 'GET_BOARD_TASKS': {
      return [
        ...state.filter(task => task.board !== action.board_id),
        ...action.tasks,
      ];
    }
    case 'CREATE_TASK': {
      return [
        ...state,
        action.task,
      ];
    }
    case 'UPDATE_TASK': {
      return state.map((task) => {
        if (task._id === action._id) {
          return Object.assign({}, task, action.update);
        }
        return task;
      })
    }
    case 'ATTACH_TASK_IMAGE': {
      return state.map((task) => {
        if (task._id === action._id) {
          return {
            ...task,
            attachments: [
              ...task.attachments,
              action.url,
            ]
          }
        }
        return task;
      })
    }
    case 'UPDATE_TASK_STATUS': {
      return state.map((task) => {
        if (task._id === action._id) {
          return Object.assign({}, task, {
            status: action.status,
          })
        }
        return task;
      })
    }
    case 'DELETE_TASK': {
      return state.filter(task => task._id !== action._id);
    }
    default: return state;
  }
}
