import React from 'react';
import { Modal } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import AuthorCreator from './AuthorCreator';

const AuthorEdit = props => (
  <Modal
    title={props.hasAuthor ? `Edit author ${props.recordedAuthor.name}` : 'Create author'}
    visible={props.authorManageVisible}
    onCancel={props.handleCloseAuthorManage}
    width={700}
    footer={false}
  >
    <LoadingOverlay active={props.isLoadingCreator} spinner text="Loading...">
      {props.authorManageVisible ? (
        <AuthorCreator
          hasAuthor={props.hasAuthor}
          recordedAuthor={props.recordedAuthor}
          handleLoading={props.handleLoading}
          finishLoading={props.finishLoading}
          handleCloseAuthorManage={props.handleCloseAuthorManage}
          updateAuthors={props.updateAuthors}
        />
      ) : null}
    </LoadingOverlay>
  </Modal>
);

export default AuthorEdit;
