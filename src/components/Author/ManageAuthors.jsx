import React, { Component } from 'react';
import api from '../../client';
import { error, success, information } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Button, Row, Col, Divider, Input } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import AuthorsTable from './AuthorsTable';
import AuthorEdit from './AuthorEdit';

class ManageAuthors extends Component {
  state = {
    authors: [],
    filteredAuthors: [],
    authorManageVisible: false,
    recordedAuthor: {},
    inputName: '',
    hasAuthor: false,
    isLoadingCreator: false,
    isLoading: false
  };

  componentDidMount() {
    this.loadAuthors();
  }

  loadAuthors = async () => {
    this.setState({ isLoading: true });
    await api()
      .get('authors')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({ authors: resp.data, filteredAuthors: resp.data });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
    this.setState({ isLoading: false });
  };

  onDelete = async authorId => {
    this.setState({ isLoading: true });
    await api()
      .post(`delete-author`, { authorId: authorId })
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          success(resp.message);
          this.setState({
            authors: this.state.authors.filter(author => (author.id === authorId ? false : true)),
            filteredAuthors: this.state.filteredAuthors.filter(author => (author.id === authorId ? false : true))
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

  updateAuthors = (data, newAuthor) => {
    if (newAuthor) {
      this.loadAuthors();
    } else {
      this.setState({
        authors: this.state.authors.map(author => (author.id === data.id ? { ...data } : author)),
        filteredAuthors: this.state.filteredAuthors.map(author => (author.id === data.id ? { ...data } : author))
      });
    }
  };

  handleManageAuthor = (author, hasAuthor) => {
    this.setState({ authorManageVisible: true, recordedAuthor: author, hasAuthor });
  };

  handleInformation = author => {
    information(<div>{author.name}</div>);
  };

  handleCloseAuthorManage = () => {
    this.setState({ authorManageVisible: false });
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
      filteredAuthors: this.state.authors.filter(
        author => author.name.toLowerCase().indexOf(value.toLowerCase()) !== -1
      )
    });
  };

  render() {
    const {
      isLoading,
      isLoadingCreator,
      filteredAuthors,
      hasAuthor,
      recordedAuthor,
      authorManageVisible,
      inputName
    } = this.state;
    return (
      <LoadingOverlay active={isLoading} spinner text="Loading...">
        <AuthorEdit
          hasAuthor={hasAuthor}
          recordedAuthor={recordedAuthor}
          handleLoading={this.handleLoading}
          finishLoading={this.finishLoading}
          handleCloseAuthorManage={this.handleCloseAuthorManage}
          updateAuthors={this.updateAuthors}
          authorManageVisible={authorManageVisible}
          isLoadingCreator={isLoadingCreator}
        />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '15px' }}>
          <h1>Authors</h1>
        </div>
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
          <Button type="primary" onClick={() => this.handleManageAuthor({}, false)}>
            Create new author
          </Button>
        </div>
        <Divider> Filters </Divider>
        <Row style={{ marginBottom: '15px' }}>
          <Col span={8}>
            Filter by Author name:
            <Input value={inputName} onChange={e => this.filterByName(e.target.value)} />
          </Col>
        </Row>
        <Divider> Author's table </Divider>
        <AuthorsTable
          filteredAuthors={filteredAuthors}
          handleInformation={this.handleInformation}
          handleManageAuthor={this.handleManageAuthor}
          onDelete={this.onDelete}
        />
        {filteredAuthors.length >= 10 ? (
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
            <Button type="primary" onClick={() => this.handleManageAuthor({}, false)}>
              Create new author
            </Button>
          </div>
        ) : (
          ''
        )}
      </LoadingOverlay>
    );
  }
}

export default ManageAuthors;
