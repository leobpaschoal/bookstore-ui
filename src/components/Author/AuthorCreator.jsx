import React, { Component } from 'react';
import api from '../../client';
import moment from 'moment';
import { error, success } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Form, Input, Button, DatePicker } from 'antd';

class AuthorCreator extends Component {
  componentDidMount = async () => {
    const { setFieldsValue } = this.props.form;
    if (this.props.hasAuthor) {
      const { recordedAuthor } = this.props;
      setFieldsValue({
        name: recordedAuthor.name,
        birthdate: moment(recordedAuthor.birthdate)
      });
    }
  };

  handleSubmit = e => {
    const { handleLoading, finishLoading } = this.props;
    handleLoading();

    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.props.hasAuthor) {
          values.id = this.props.recordedAuthor.id;
        } else {
          values.id = 0;
        }

        await api()
          .post('save-author', {
            id: values.id,
            name: values.name,
            birthdate: moment(values.birthdate).format('YYYY-MM-DD')
          })
          .then(response => {
            const resp = response.data;
            if (resp.status === 1) {
              success(resp.message);
              if (this.props.hasAuthor) {
                this.props.updateAuthors(resp.data, false);
              } else {
                this.props.updateAuthors(resp.data, true);
              }
              this.props.handleCloseAuthorManage();
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
    const { hasAuthor } = this.props;

    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
    const buttonLayout = { wrapperCol: { sm: { offset: 4 }, xs: { offset: 0 } } };

    return (
      <Form {...formItemLayout} layout="horizontal">
        <Form.Item label="Name">
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Input author name!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Birth Date">
          {getFieldDecorator('birthdate', {
            rules: [{ required: true, message: 'Input author birth date!' }]
          })(<DatePicker />)}
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button onClick={this.handleSubmit} type="primary">
            {hasAuthor ? 'Edit' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const AuthorCreatorForm = Form.create({ name: 'create-author' })(AuthorCreator);

export default AuthorCreatorForm;
