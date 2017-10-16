import React from 'react';

import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css';

const Actions = ({ onImageUpload, uploading, actions, task }) => (
  <div className="task-info-actions">
    <div>
      <input
        type="file"
        id="task-image-upload"
        className="hidden"
        accept="image/*"
        onChange={onImageUpload}
        disabled={uploading}
      />
      <Flatpickr
        onChange={dueDate => actions.updateTask({ dueDate: new Date(dueDate).getTime() })}
        id="task-add-dueDate"
        // className="hidden"
      />
      <input type="date" id="task-add-due-date" className="hidden" />
      <label htmlFor="task-image-upload">
        <i className="material-icons icon-renew">image</i>
      </label>
      { uploading && <i className="material-icons icon-uploading bouncing">cloud_upload</i> }
      <label htmlFor="task-add-dueDate">
        <i className="material-icons icon-renew" onClick={actions.addDueDate}>alarm_add</i>
      </label>
    </div>
    <div>
      {
        task.status === 'active'
        ? <i className="material-icons icon-done" onClick={actions.completeTask}>done</i>
        : <i className="material-icons icon-done" onClick={actions.activateTask}>replay</i>
      }
      <i className="material-icons icon-delete" onClick={actions.deleteTask}>close</i>
    </div>
  </div>
)

export default Actions;
