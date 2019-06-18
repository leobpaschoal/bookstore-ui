import React from 'react';
import moment from 'moment';

import { Table, Tooltip, Icon, Popconfirm } from 'antd';

const { Column } = Table;

const AuthorsTable = props => (
  <Table
    bordered
    pagination={{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50']
    }}
    dataSource={props.filteredAuthors.map(author => ({
      ...author,
      key: author.id,
      birthdate: moment(author.birthdate).format('MMMM DD, YYYY'),
      age: moment().diff(author.birthdate, 'years')
    }))}
  >
    <Column align="center" title="Register" dataIndex="id" key="id" />
    <Column align="center" title="Name" dataIndex="name" key="name" />
    <Column align="center" title="Age" dataIndex="age" key="age" />
    <Column align="center" title="Birth Date" dataIndex="birthdate" key="birthdate" />
    <Column
      align="center"
      title="Actions"
      render={author => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Tooltip placement="top" title="Author information" arrowPointAtCenter>
              <Icon type="eye" onClick={() => props.handleInformation(author)} style={{ fontSize: '20px' }} />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Edit" arrowPointAtCenter>
              <Icon
                type="edit"
                onClick={() => props.handleManageAuthor(author, true)}
                style={{ fontSize: '16px', color: '#1890ff' }}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Delete" arrowPointAtCenter>
              <Popconfirm
                placement="bottomLeft"
                title="Are you sure to delete this author?"
                onConfirm={() => props.onDelete(author.id)}
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

export default AuthorsTable;
