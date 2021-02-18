import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Form from 'react-bootstrap/Form';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import TagList from '@app/components/TagList';
import ApiMovies from '@app/api/movies';

const allowedMovieFormats = ['VHS', 'DVD', 'Blu-Ray'];
const currentYear = new Date().getFullYear();

const form = () => ({
  title: '',
  stars: [],
  releaseYear: currentYear,
  format: allowedMovieFormats[0],
});

class AddMovieModal extends React.Component {
  state = {
    error: null,
    inProgress: false,
    show: false,
    form: form()
  };

  open = (payload = {}) => {
    this.setState({
      show: true,
      inProgress: false,
      error: null,
    });
  };

  resetForm = () => {
    this.setState({form: form()})
  }

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
    const { form } = this.state;
    this.setState({ inProgress: true, error: null });
    ApiMovies.save(form)
      .then(({ body }) => {
        this.setState({ inProgress: false });
        this.resetForm();
        this.handleDone(body);
      })
      .catch((err) => {
        this.setState({ inProgress: false, error: err.response.data.error });
      });
  };

  handleFormat = (format) => {
    const { form } = this.state;
    this.setState({ form: { ...form, format } });
  };

  render() {
    const { show, form, inProgress, error } = this.state;

    return (
      <Modal centered show={show} onHide={this.handleCancel}>
        <Modal.Header>
          <Modal.Title>Adding new movie</Modal.Title>
        </Modal.Header>

        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label column>Title</Form.Label>
            <div className="FormContent">
              <Form.Control
                type="text"
                placeholder="The Big Lebowski"
                onChange={(e) =>
                  this.setState({
                    form: {
                      ...form,
                      title: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formYear">
            <Form.Label column>Year</Form.Label>
            <div className="FormContent">
              <Form.Control
                type="number"
                value={form.releaseYear}
                onChange={(e) =>
                  this.setState({
                    form: {
                      ...form,
                      releaseYear: e.currentTarget.value,
                    },
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formStars">
            <Form.Label column>Stars</Form.Label>
            <div className="FormContent">
              <TagList
                disabled={inProgress}
                className="w-100"
                value={form.stars}
                onChange={(stars) =>
                  this.setState({
                    form: {
                      ...form,
                      stars,
                    },
                  })
                }
              />
            </div>
          </Form.Group>
          <Form.Group controlId="formFormat">
            <Form.Label column>Format</Form.Label>
            <div className="FormContent pl-4">
              <Dropdown>
                <DropdownButton
                  id="dropdown-basic-button"
                  variant="secondary"
                  size="sm"
                  title={form.format}
                  onSelect={this.handleFormat}
                >
                  {allowedMovieFormats.map((format, idx) => (
                    <Dropdown.Item eventKey={format} key={idx}>
                      {format}
                    </Dropdown.Item>
                  ))}
                </DropdownButton>
              </Dropdown>
            </div>
          </Form.Group>
        </Form>

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
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default AddMovieModal;
