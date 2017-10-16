import React from 'react';

import { Well, Image } from 'react-bootstrap';

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

export default Attachments;
