import React, { Component } from 'react';
import api from '../../client';
import { error, success } from '../Utils/UtilsModal';
import { messages } from '../Constants/messages';
import { Form, Input, Button, Select, InputNumber } from 'antd';

const { TextArea } = Input;
const { Option } = Select;

class BookCreator extends Component {
  state = {
    authors: [],
    genres: []
  };

  componentDidMount = async () => {
    const { handleLoading, finishLoading } = this.props;
    handleLoading();
    await this.loadAuthorsAndGenres();

    const { setFieldsValue } = this.props.form;
    if (this.props.hasBook) {
      const { recordedBook } = this.props;
      setFieldsValue({
        title: recordedBook.title,
        author_id: recordedBook.author_id,
        description: recordedBook.description,
        quantity: recordedBook.quantity,
        isbn: recordedBook.isbn,
        genres: recordedBook.genres.map(genre => genre.id)
      });
    }

    finishLoading();
  };

  handleSubmit = e => {
    const { handleLoading, finishLoading } = this.props;
    handleLoading();

    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        if (this.props.hasBook) {
          values.id = this.props.recordedBook.id;
        } else {
          values.id = 0;
        }

        await api()
          .post('save-book', values)
          .then(response => {
            const resp = response.data;
            if (resp.status === 1) {
              success(resp.message);
              if (this.props.hasBook) {
                this.props.updateBooks(resp.data, false);
              } else {
                this.props.updateBooks(resp.data, true);
              }
              this.props.handleCloseBookManage();
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

  loadAuthorsAndGenres = async () => {
    let hasError = false;
    await api()
      .get('authors')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({ authors: resp.data });
        } else {
          error(resp.message);
          hasError = true;
        }
      })
      .catch(() => {
        error(messages.errorMessage);
        hasError = true;
      });

    if (hasError) {
      return false;
    }

    await api()
      .get('genres')
      .then(response => {
        const resp = response.data;
        if (resp.status === 1) {
          this.setState({ genres: resp.data });
        } else {
          error(resp.message);
        }
      })
      .catch(() => {
        error(messages.errorMessage);
      });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { genres, authors } = this.state;
    const { hasBook } = this.props;

    const formItemLayout = { labelCol: { span: 4 }, wrapperCol: { span: 18 } };
    const buttonLayout = { wrapperCol: { sm: { offset: 4 }, xs: { offset: 0 } } };

    return (
      <Form {...formItemLayout} layout="horizontal" onSubmit={this.handleSubmit}>
        <Form.Item label="Title">
          {getFieldDecorator('title', {
            rules: [{ required: true, message: 'Input book title!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Description">
          {getFieldDecorator('description', {
            rules: [{ required: true, message: 'Input book description!' }]
          })(<TextArea rows={4} />)}
        </Form.Item>
        <Form.Item label="ISBN">
          {getFieldDecorator('isbn', {
            rules: [{ required: true, message: 'Input book isbn!' }]
          })(<Input />)}
        </Form.Item>
        <Form.Item label="Main author">
          {getFieldDecorator('author_id', {
            rules: [{ required: true, message: 'Input an main author!' }]
          })(
            <Select showSearch>
              {authors.map(author => (
                <Option key={author.id} value={author.id}>
                  {author.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Genres">
          {getFieldDecorator('genres', {
            rules: [{ required: true, message: 'Select a genre or more!' }]
          })(
            <Select showSearch mode="multiple">
              {genres.map(genre => (
                <Option key={genre.id} value={genre.id}>
                  {genre.name}
                </Option>
              ))}
            </Select>
          )}
        </Form.Item>
        <Form.Item label="Quantity">
          {getFieldDecorator('quantity', {
            rules: [{ required: true, message: 'Input quantity books has on stock!' }]
          })(<InputNumber min={0} max={9999} />)}
        </Form.Item>
        <Form.Item {...buttonLayout}>
          <Button type="primary" htmlType="submit">
            {hasBook ? 'Edit' : 'Save'}
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

const BookCreatorForm = Form.create({ name: 'create-book' })(BookCreator);

export default BookCreatorForm;
