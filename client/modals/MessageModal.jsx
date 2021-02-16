import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class MessageModal extends React.Component {
  state = {
    message: '',
    show: false,
  };

  open = (payload = {}) => {
    this.setState({
      show: true,
      message: payload,
    });
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  render() {
    const { show, message } = this.state;

    return (
      <Modal centered show={show}>
        <Modal.Header>
          <Modal.Title>Response uplodaing file</Modal.Title>
        </Modal.Header>

        <Modal.Body>{message}</Modal.Body>

        <Modal.Footer>
          <Button variant="warning" onClick={this.handleClose}>
            Ok
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default MessageModal;
