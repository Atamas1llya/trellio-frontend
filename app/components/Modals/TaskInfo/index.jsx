import React from 'react';

import { Modal } from 'react-bootstrap';

import TaskTitle from './TaskTitle';
import TaskDescr from './TaskDescr';
import DueDate from './DueDate';
import Attachments from './Attachments';
import Actions from './Actions';

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
          <TaskDescr
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

export default SignupModal;
