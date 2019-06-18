import React, { Component } from 'react';
import api from '../../client';
import { error, success } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Form, Input, Button } from 'antd';

class GenreCreator extends Component {
  componentDidMount = async () => {
    const { setFieldsValue } = this.props.form;
    if (this.props.hasGenre) {
      const { recordedGenre } = this.props;
      setFieldsValue({ name: recordedGenre.name });
    }
  };

  handleSubmit = e => {
    const { handleLoading, finishLoading } = this.props;
    handleLoading();

    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.props.hasGenre) {
          values.id = this.props.recordedGenre.id;
        } else {
          values.id = 0;
        }

        await api()
          .post('save-genre', values)
          .then(response => {
            const resp = response.data;
            if (resp.status === 1) {
              success(resp.message);
              if (this.props.hasGenre) {
                this.props.updateGenres(resp.data, false);
              } else {
                this.props.updateGenres(resp.data, true);
              }
              this.props.handleCloseGenreManage();
            } else {
              error(resp.message);
            }
          })
          .catch(() => {
            error(messages.errorMessage);
          });
      }
      finishLoading();
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { hasGenre } = this.props;

    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
    const buttonLayout = { wrapperCol: { sm: { offset: 4 }, xs: { offset: 0 } } };

    return (
      <Form {...formItemLayout} layout="horizontal">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Input genre name!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={this.handleSubmit} type="primary">
            {hasGenre ? 'Edit' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const GenreCreatorForm = Form.create({ name: 'create-genre' })(GenreCreator);

export default GenreCreatorForm;
