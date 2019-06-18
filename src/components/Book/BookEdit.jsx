import React from 'react';
import { Modal } from 'antd';
import LoadingOverlay from 'react-loading-overlay';
import BookCreator from './BookCreator';

const BookEdit = props => (
  <Modal
    title={props.hasBook ? `Edit book ${props.recordedBook.title}` : 'Create book'}
    visible={props.bookManageVisible}
    onCancel={props.handleCloseBookManage}
    width={700}
    footer={false}
  >
    <LoadingOverlay active={props.isEditingLoading} spinner text="Loading...">
      {props.bookManageVisible ? (
        <BookCreator
          hasBook={props.hasBook}
          recordedBook={props.recordedBook}
          handleLoading={props.handleEditingLoading}
          finishLoading={props.finishEditingLoading}
          handleCloseBookManage={props.handleCloseBookManage}
          updateBooks={props.updateBooks}
          cleanAllFilters={props.cleanAllFilters}
        />
      ) : null}
    </LoadingOverlay>
  </Modal>
);

export default BookEdit;
