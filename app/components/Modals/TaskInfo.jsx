import React from 'react';
import moment from 'moment';

import InlineEdit from 'react-edit-inline';

import { Modal } from 'react-bootstrap';

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

export default SignupModal;
