import React from 'react';

import moment from 'moment';
import InlineEdit from 'react-edit-inline';

import Flatpickr from 'react-flatpickr'
import 'flatpickr/dist/themes/dark.css';

import { Modal, Well, Image } from 'react-bootstrap';

const SignupModal = ({ task = { creator: false }, uploading, ...actions }) => {
  return (
    <Modal show={true} onHide={actions.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <TaskTitle
            title={task.title}
            status={task.status}
            updateTitle={e => actions.updateTask(e)}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="task-info">
          <TaskDescription
            description={task.description}
            status={task.status}
            updateDescription={e => actions.updateTask(e)}
          />
          <div>
            <DueDate dueDate={task.dueDate} />
            <span className="task-creator">Created by { task.creator.name }</span>
          </div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Attachments
          attachments={task.attachments}
        />

        <Actions
          onImageUpload={actions.onImageUpload}
          uploading={uploading}
          actions={actions}
          task={task}
        />
      </Modal.Footer>
    </Modal>
  );
};

const TaskTitle = ({ title, status, updateTitle }) => (
  <span className="brand">
    <InlineEdit
      activeClassName="inline-input"
      text={title || 'New task'}
      paramName="title"
      className={status === 'complete' ? 'task-info-title completed' : null }
      change={e => updateTitle(e)}
    />
  </span>
);

const TaskDescription = ({ description, status, updateDescription }) => (
  <InlineEdit
    activeClassName="inline-input"
    text={description || 'Description is not provided...'}
    paramName="description"
    className={status === 'complete' ? 'task-info-description completed' : null }
    change={e => updateDescription(e)}
  />
);

const DueDate = ({ dueDate }) => {
  const momentConfig = {
    lastDay : '[Yesterday]',
    sameDay : '[Today]',
    nextDay : '[Tomorrow]',
    lastWeek : '[last] dddd',
    nextWeek : 'dddd',
    sameElse : 'L'
  }

  if (dueDate) {
    return (
      <span className="task-expires">
        Due date:
        <span className="date"> { moment(dueDate).calendar(null, momentConfig) }</span>
      </span>
    );
  }
  return null;
};

const Attachments = ({ attachments = [] }) => {
  return (
    <div>
      <div className="task-images-list">
        {
          attachments.map((url, index) => {
            return (
              <Well className="task-image" bsSize="small" key={index}>
                <a href={url} target="_blank">
                  <Image src={url} responsive />
                </a>
              </Well>
            );
          })
        }
      </div>
    </div>
  )
}

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

export default SignupModal;
