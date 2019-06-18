import React, { Component } from 'react';
import api from '../../client';
import { error, success, information } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Button, Divider, Row, Col, Input } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import GenresTable from './GenresTable';
import GenreEdit from './GenreEdit';

class ManageGenres extends Component {
  state = {
    genres: [],
    filteredGenres: [],
    genreManageVisible: false,
    recordedGenre: {},
    inputName: '',
    hasGenre: false,
    isLoadingCreator: false,
    isLoading: false
  };

  componentDidMount() {
    this.loadGenres();
  }

  loadGenres = async () => {
    this.setState({ isLoading: true });
    await api()
      .get('genres')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({ genres: resp.data, filteredGenres: resp.data });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isLoading: false });
  };

  onDelete = async genreId => {
    this.setState({ isLoading: true });
    await api()
      .post(`delete-genre`, { genreId: genreId })
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          success(resp.message);
          this.setState({
            genres: this.state.genres.filter(genre => (genre.id === genreId ? false : true)),
            filteredGenres: this.state.filteredGenres.filter(genre => (genre.id === genreId ? false : true))
          });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isLoading: false });
  };

  updateGenres = (data, newGenre) => {
    if (newGenre) {
      this.loadGenres();
    } else {
      this.setState({
        genres: this.state.genres.map(genre => (genre.id === data.id ? { ...data } : genre)),
        filteredGenres: this.state.filteredGenres.map(genre => (genre.id === data.id ? { ...data } : genre))
      });
    }
  };

  handleManageGenre = (genre, hasGenre) => {
    this.setState({ genreManageVisible: true, recordedGenre: genre, hasGenre });
  };

  handleInformation = genre => {
    information(<div>{genre.name}</div>);
  };

  handleCloseGenreManage = () => {
    this.setState({ genreManageVisible: false });
  };

  handleLoading = () => {
    this.setState({ isLoadingCreator: true });
  };

  finishLoading = () => {
    this.setState({ isLoadingCreator: false });
  };

  filterByName = value => {
    this.setState({
      inputName: value,
      filteredGenres: this.state.genres.filter(genre => genre.name.toLowerCase().indexOf(value.toLowerCase()) !== -1)
    });
  };

  render() {
    const {
      isLoading,
      isLoadingCreator,
      filteredGenres,
      hasGenre,
      recordedGenre,
      genreManageVisible,
      inputName
    } = this.state;
    return (
      <LoadingOverlay active={isLoading} spinner text="Loading...">
        <GenreEdit
          hasGenre={hasGenre}
          recordedGenre={recordedGenre}
          handleLoading={this.handleLoading}
          finishLoading={this.finishLoading}
          handleCloseGenreManage={this.handleCloseGenreManage}
          updateGenres={this.updateGenres}
          genreManageVisible={genreManageVisible}
          isLoadingCreator={isLoadingCreator}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <h1>Genres</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button type="primary" onClick={() => this.handleManageGenre({}, false)}>
            Create new genre
          </Button>
        </div>
        <Divider> Filters </Divider>
        <Row style={{ marginBottom: '15px' }}>
          <Col span={8}>
            Filter by Genre name:
            <Input value={inputName} onChange={e => this.filterByName(e.target.value)} />
          </Col>
        </Row>
        <Divider> Genre's table </Divider>
        <GenresTable
          filteredGenres={filteredGenres}
          handleInformation={this.handleInformation}
          handleManageGenre={this.handleManageGenre}
          onDelete={this.onDelete}
        />
        {filteredGenres.length >= 10 ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button type="primary" onClick={() => this.handleManageGenre({}, false)}>
              Create new genre
            </Button>
          </div>
        ) : (
          ''
        )}
      </LoadingOverlay>
    );
  }
}

export default ManageGenres;
