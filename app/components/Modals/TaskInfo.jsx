import React from 'react';
import moment from 'moment';

import InlineEdit from 'react-edit-inline';

import { Modal, Well } from 'react-bootstrap';

const SignupModal = ({ task = false, ...actions }) => {
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
          onImageUpload={actions.onImageUpload}
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

const Attachments = ({ attachments = [], onImageUpload }) => {
  if (attachments.length > 0) {
    return (
      <div>
        <Well bsSize="small">
          {/* Attachments here */}
        </Well>
      </div>
    )
  } else {
    return (
      <div className="task-info-actions">
        <div>
          <input
            type="file"
            id="task-image-upload"
            className="hidden"
            accept="image/*"
            onChange={onImageUpload}
          />
          <label htmlFor="task-image-upload">
            <i className="material-icons icon-renew">image</i>
          </label>
        </div>
        <div>
          <i className="material-icons icon-done">done</i>
          <i className="material-icons icon-delete">close</i>
          <i className="material-icons icon-delete">delete</i>
        </div>
      </div>
    )
  }
}

export default SignupModal;
