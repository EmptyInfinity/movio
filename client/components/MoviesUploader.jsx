import React from 'react';
import Button from 'react-bootstrap/Button';

class MoviesUploader extends React.Component {
  fileInput = React.createRef();

  resetFileInput = () => {
    this.fileInput.current.value = '';
  };

  onFileChange = (e) => {
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      const { onChange } = this.props;
      const file = e.target.files[0];
      if (!file) return;

      if (onChange) onChange(e, file);
      this.resetFileInput();
    } else {
      alert('The File APIs are not fully supported in this browser.');
    }
  };

  render() {
    return (
      <Button variant="outline-warning" className="movieUploaderWrap">
        Upload movie
        <input
          ref={this.fileInput}
          accept="text/plain"
          className="movieUploader"
          type="file"
          onChange={this.onFileChange}
        />
      </Button>
    );
  }
}

export default MoviesUploader;
