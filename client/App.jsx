import React from 'react';
import Pagination from 'react-bootstrap/Pagination';
import Header from '@app/components/Header';
import MovieItem from './components/MovieItem';
import { connect } from 'react-redux';
import { fetchMovies } from '@app/store/movies';

// images
import SortIcon from '@app/assets/images/ascending-sort.png';

const MOVIES_PER_PAGE = 3;

class App extends React.Component {
  state = {
    ready: false,
    currentPage: 1,
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
    const { ready, search, searchType, sort, currentPage } = this.state;
    const { movies } = this.props;
    const currentPageMax = currentPage * MOVIES_PER_PAGE;
    const currentPageMin = (currentPage - 1) * MOVIES_PER_PAGE;
    const pagesAmount = Math.ceil(movies.length / MOVIES_PER_PAGE);
    const isPrev = currentPage > 1;
    const isNext = currentPage < pagesAmount;

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
      }).filter((movie, idx) => {
        const currentIdx = idx + 1;

        if (currentIdx > currentPageMin && currentIdx <= currentPageMax){
          return movie
        }
      })

    const renderMovies = () => {
      if (!moviesWithSearch[0]) {
        return <h3>No movies found</h3>;
      }

      return moviesWithSearch.map((movie, idx) => <MovieItem {...movie} key={idx} />);
    };

    const navigate = (currentPage) => {
      this.setState({currentPage})
    }


    const renderPagination = () => {
      const pages = new Array(pagesAmount).fill(null);
      return (
        <Pagination>
          <Pagination.Prev disabled={!isPrev} onClick={() => navigate(currentPage - 1)}/>

          {pages.map((page, idx) => (
             <Pagination.Item className={currentPage === idx + 1 ? 'current' : ''} key={idx} onClick={() => navigate(idx + 1)}>{idx + 1}</Pagination.Item>
          ))}


          {/* {pagesAmount !== 1 && <>
            <Pagination.Ellipsis />
            <Pagination.Item onClick={() => navigate(pagesAmount)}>{pagesAmount}</Pagination.Item>
          </>} */}
          <Pagination.Next disabled={!isNext} onClick={() => navigate(currentPage + 1)}/>
        </Pagination>
      )
    }

   

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
              className={sort === 'az' ? 'az' : 'za'}
            />
          </div>

          <div className="movies row">{renderMovies()}</div>

          {renderPagination()}
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
