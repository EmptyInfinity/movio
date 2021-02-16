import React from 'react';
import Header from '@app/components/Header';
import MovieItem from './components/MovieItem';
import { connect } from 'react-redux';
import { fetchMovies } from '@app/store/movies';

// images
import SortIcon from '@app/assets/images/ascending-sort.png';

class App extends React.Component {
  state = {
    ready: false,
    movies: [],
    search: '',
    searchType: 'title',
    sort: 'az',
  };

  UNSAFE_componentWillMount = () => {
    const appInitQueue = [];

    const pageLoaded = new Promise((resolve) => {
      window.addEventListener('load', () => {
        resolve();
      });
    });
    appInitQueue.push(pageLoaded);

    Promise.all(appInitQueue).finally(() => {
      this.setState({ ready: true });
      window.spinner.hide();
    });
  };

  componentDidMount() {
    this.props.fetchMovies();
  }

  handleSort = () => {
    const { sort } = this.state;
    this.setState({ sort: sort === 'az' ? 'za' : 'az' });
  };

  render() {
    const { ready, search, searchType, sort } = this.state;
    const { movies } = this.props;

    const moviesWithSearch = movies
      .filter((movie) => {
        const string = typeof movie[searchType] === 'string';
        const array = Array.isArray(movie[searchType]);

        if (string) {
          return movie[searchType].toLowerCase().includes(search.toLowerCase());
        } else if (array) {
          return movie[searchType].find((val) => val.toLowerCase().includes(search.toLowerCase()));
        }
      })
      .sort((a, b) => {
        if (sort === 'az') {
          return a.title.localeCompare(b.title);
        } else {
          return b.title.localeCompare(a.title);
        }
      });

    const renderMovies = () => {
      if (!moviesWithSearch[0]) {
        return <h3>No movies found</h3>;
      }

      return moviesWithSearch.map((movie, idx) => <MovieItem {...movie} key={idx} />);
    };

    /**
     * Waiting initialized data from API
     */
    if (!ready) return null;

    return (
      <div>
        <Header onMoviesSearch={(search, searchType) => this.setState({ search, searchType })} />

        <div className="container py-5">
          <h1 className="mb-4">What to watch</h1>
          <div className="sort pb-2 text-right">
            <img
              src={SortIcon}
              onClick={() => this.handleSort()}
              className={sort === 'az' ? 'za' : 'az'}
            />
          </div>

          <div className="movies row">{renderMovies()}</div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  movies: state.movies.list,
});

const mapDispatchToActions = {
  fetchMovies,
};

export default connect(mapStateToProps, mapDispatchToActions)(App);
