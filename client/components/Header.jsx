import React from 'react';
import { connect } from 'react-redux';
import { fetchMovies } from '@app/store/movies';
import ApiMovies from '@app/api/movies';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import MoviesUploader from '@app/components/MoviesUploader';
import AddMovieModal from '@app/modals/AddMovieModal';
import MessageModal from '@app/modals/MessageModal';

const searchTypes = ['title', 'stars', 'format'];

class Header extends React.Component {
  AddingMovieModal = React.createRef();
  ShowMessageModal = React.createRef();

  state = {
    search: '',
    searchType: 'title',
  };

  handleSearch = (e) => {
    const search = e.currentTarget.value;
    const { searchType } = this.state;

    this.setState({ search });
    this.props.onMoviesSearch(search, searchType);
  };

  handleUpload = (e, file) => {
    ApiMovies.upload(file)
      .then((resp) => {
        this.ShowMessageModal.current.open('Movies were successfully uploaded!');
        this.props.fetchMovies();
      })
      .catch(({ response }) => {
        this.ShowMessageModal.current.open(response.data.error);
      });
  };

  render() {
    const { search, searchType } = this.state;
    return (
      <header className="d-flex justify-content-center">
        <div className="container py-2 d-flex align-items-center justify-content-center">
          <div className="logo">MOVIO</div>
          <InputGroup className="mx-3 d-flex ">
            <Dropdown>
              <DropdownButton
                id="dropdown-basic-button"
                variant="secondary"
                title={searchType}
                onSelect={(searchType) => this.setState({ searchType })}
              >
                {searchTypes.map((type, idx) => (
                  <Dropdown.Item eventKey={type} key={idx}>
                    {type}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Dropdown>
            <FormControl
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              value={search}
              onChange={(e) => this.handleSearch(e)}
            />
          </InputGroup>
          <Button
            variant="outline-warning"
            className="mr-3"
            onClick={() => this.AddingMovieModal.current.open()}
          >
            Add movie
          </Button>

          <MoviesUploader onChange={(e, file) => this.handleUpload(e, file)} />
        </div>
        <AddMovieModal ref={this.AddingMovieModal} onDone={() => this.props.fetchMovies()} />
        <MessageModal ref={this.ShowMessageModal} />
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

const mapDispatchToActions = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToActions)(Header);
