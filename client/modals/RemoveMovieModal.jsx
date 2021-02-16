import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import ApiMovies from '@app/api/movies';

class RemoveMovieModal extends React.Component {
  state = {
    error: null,
    inProgress: false,
    show: false,
  };

  handleDone(result) {
    const { onDone } = this.props;
    if (onDone) onDone(result);
    this.handleClose();
  }

  handleCancel = () => {
    const { onCancel } = this.props;
    if (onCancel) onCancel();
    this.handleClose();
  };

  handleClose = () => {
    this.setState({
      show: false,
    });
  };

  handleSubmit = () => {
    const { movie } = this.state;
    this.setState({ inProgress: true, error: null });
    ApiMovies.remove(movie._id)
      .then(() => {
        this.setState({ inProgress: false });
        this.handleDone(movie._id);
      })
      .catch((err) => {
        this.setState({ inProgress: false, error: err.response.data.error });
      });
  };

  open = (payload = {}) => {
    this.setState({
      inProgress: false,
      error: null,
      show: true,
      movie: payload,
    });
  };

  render() {
    const { show, inProgress, error, movie } = this.state;

    return (
      <Modal centered show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>
            <p>Are you sure, you want to remove this movie?</p>
            <p>"{movie && movie.title}"</p>
          </Modal.Title>
        </Modal.Header>

        {error && (
          <Alert className="m-0" variant="danger">
            {error}
          </Alert>
        )}

        <Modal.Footer>
          <Button disabled={inProgress} variant="dark" onClick={this.handleCancel}>
            Cancel
          </Button>
          <Button disabled={inProgress} variant="warning" onClick={this.handleSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default RemoveMovieModal;
