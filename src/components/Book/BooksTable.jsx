import React from 'react';
import { Icon, Button, Tooltip, Popover, InputNumber, Table, Popconfirm } from 'antd';

const { Column } = Table;

const BooksTable = props => (
  <Table
    bordered
    pagination={{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50']
    }}
    dataSource={props.filteredBooks.map(book => ({
      ...book,
      key: book.id,
      author: book.author.name,
      age: book.author.age
    }))}
  >
    <Column align="center" title="Register" dataIndex="id" key="id" />
    <Column align="center" title="Title" dataIndex="title" key="title" />
    <Column align="center" title="Author" dataIndex="author" key="author" />
    <Column
      align="center"
      title="Genre"
      render={book =>
        book.genres.length === 1 ? (
          book.genres[0].name
        ) : book.genres.length > 1 ? (
          <Popover
            placement="rightTop"
            title="Genres list"
            content={
              <ul>
                {book.genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            }
          >
            <Icon type="unordered-list" style={{ cursor: 'pointer' }} />
          </Popover>
        ) : (
          <Tooltip placement="top" title="No genre" arrowPointAtCenter>
            <Icon type="meh" />
          </Tooltip>
        )
      }
    />
    <Column
      align="center"
      title="Quantity"
      dataIndex="quantity"
      key="quantity"
      render={(text, book) => (
        <Popover
          placement="rightTop"
          title="Stock quantity"
          onMouseEnter={() => props.handleQuantity(book.quantity)}
          content={
            <div style={{ display: 'flex' }}>
              <InputNumber
                min={0}
                max={9999}
                value={props.quantity}
                type="number"
                style={{ width: '100px', marginRight: '8px' }}
                onChange={props.handleQuantity}
                disabled={props.isStockLoading}
              />
              <Button
                disabled={props.isStockLoading}
                shape="circle"
                onClick={() => props.onStock(book.id, props.quantity)}
              >
                {props.isStockLoading ? <Icon type="loading" /> : <Icon type="like" style={{ color: 'green' }} />}
              </Button>
            </div>
          }
        >
          <span style={{ cursor: 'pointer' }}>{text}</span>
        </Popover>
      )}
    />
    <Column align="center" title="ISBN" dataIndex="isbn" key="isbn" />
    <Column
      align="center"
      title="Available"
      render={book =>
        book.quantity > 0 ? (
          <Icon style={{ color: 'green' }} type="check" />
        ) : (
          <Icon style={{ color: 'red' }} type="stop" />
        )
      }
    />
    <Column
      align="center"
      title="Actions"
      render={book => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Tooltip placement="top" title="Book information" arrowPointAtCenter>
              <Icon type="read" onClick={() => props.handleInformation(book)} style={{ fontSize: '20px' }} />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Edit" arrowPointAtCenter>
              <Icon
                type="edit"
                onClick={() => props.handleManageBook(book, true)}
                style={{ fontSize: '16px', color: '#1890ff' }}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Delete" arrowPointAtCenter>
              <Popconfirm
                placement="bottomLeft"
                title="Are you sure to delete this book?"
                onConfirm={() => props.onDelete(book.id)}
                okText="Yes"
                cancelText="No"
              >
                <Icon type="delete" style={{ fontSize: '16px', color: 'red' }} />
              </Popconfirm>
            </Tooltip>
          </div>
        </div>
      )}
    />
  </Table>
);

export default BooksTable;
