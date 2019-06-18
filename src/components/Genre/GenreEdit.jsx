import React from 'react';
import { Modal } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import GenreCreator from './GenreCreator';

const GenreEdit = props => (
  <Modal
    title={props.hasGenre ? `Edit genre ${props.recordedGenre.name}` : 'Create genre'}
    visible={props.genreManageVisible}
    onCancel={props.handleCloseGenreManage}
    width={700}
    footer={false}
  >
    <LoadingOverlay active={props.isLoadingCreator} spinner text="Loading...">
      {props.genreManageVisible ? (
        <GenreCreator
          hasGenre={props.hasGenre}
          recordedGenre={props.recordedGenre}
          handleLoading={props.handleLoading}
          finishLoading={props.finishLoading}
          handleCloseGenreManage={props.handleCloseGenreManage}
          updateGenres={props.updateGenres}
        />
      ) : null}
    </LoadingOverlay>
  </Modal>
);

export default GenreEdit;
