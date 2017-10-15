import React from 'react';
import moment from 'moment';

import InlineEdit from 'react-edit-inline';

import { Modal, Well, Image } from 'react-bootstrap';

const SignupModal = ({ task = false, uploading, ...actions }) => {
  return (
    <Modal show={true} onHide={actions.onHide}>
      <Modal.Header closeButton>
        <Modal.Title>
          <TaskTitle
            title={task.title}
            updateTitle={e => actions.updateTask(e)}
          />
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <div className="task-info">
          <TaskDescription
            description={task.description}
            updateDescription={e => actions.updateTask(e)}
          />
          <DueDate dueDate={Date.now()} />
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

const TaskTitle = ({ title, updateTitle }) => (
  <span className="brand">
    <InlineEdit
      activeClassName="inline-input"
      text={title || 'New task'}
      paramName="title"
      change={e => updateTitle(e)}
    />
  </span>
);

const TaskDescription = ({ description, updateDescription }) => (
  <InlineEdit
    activeClassName="inline-input"
    text={description || 'Description is not provided...'}
    paramName="description"
    change={e => updateDescription(e)}
  />
);

const DueDate = ({ dueDate }) => {
  if (dueDate) {
    return (
      <span className="task-expires">Expiration date: { moment(dueDate).calendar() }</span>
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
      <label htmlFor="task-image-upload">
        <i className="material-icons icon-renew">image</i>
      </label>
      { uploading && <i className="material-icons icon-uploading bouncing">cloud_upload</i> }
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
