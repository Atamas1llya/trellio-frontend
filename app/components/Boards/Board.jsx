import React, { Component } from 'react';
import clickOutside from 'react-click-outside';

import { Panel, Col } from 'react-bootstrap';

class Board extends Component {
  state = {
    editable: false,
  }

  handleClickOutside() {
    this.toggle();
  }

  toggle() {
    this.setState({
      editable: !this.state.editable,
    })
  }

  render() {
    const { title } = this.props;

    const togglableTitle = (
      <span onClick={() => this.toggle()}>{ title || 'Board title' }</span>
    )

    const titleInput = (
      <input
        type="text"
        className="inline-input"
        autoFocus
        defaultValue={title}
        onFocus={e => e.target.select()}
        onChange={e => this.props.updateTitle(e)}
        placeholder="Board title"
      />
    )

    if (this.state.editable) {
      return (
        <Col xs={12} md={5} lg={3}>
          <Panel className="board fadeIn animated" header={titleInput}>
              { this.props.children }
          </Panel>
        </Col>
      );
    } else {
      return (
        <Col xs={12} md={5} lg={3}>
          <Panel
            className="board fadeIn animated"
            header={togglableTitle}>
              { this.props.children }
          </Panel>
        </Col>
      );
    }
  }
}

export default clickOutside(Board)
