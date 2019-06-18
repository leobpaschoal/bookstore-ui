import React from 'react';
import moment from 'moment';
import { Table, Tooltip, Icon, Popconfirm } from 'antd';

const { Column } = Table;

const GenresTable = props => (
  <Table
    bordered
    pagination={{
      defaultPageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ['10', '20', '50']
    }}
    dataSource={props.filteredGenres.map(genre => ({
      ...genre,
      key: genre.id,
      created_at: moment(genre.created_at).format('DD-MMM-Y HH:mm'),
      updated_at: moment(genre.updated_at).format('DD-MMM-Y HH:mm')
    }))}
  >
    <Column align="center" title="Register" dataIndex="id" key="id" />
    <Column align="center" title="Name" dataIndex="name" key="name" />
    <Column align="center" title="Created at" dataIndex="created_at" key="created_at" />
    <Column align="center" title="Last update" dataIndex="updated_at" key="updated_at" />
    <Column
      align="center"
      title="Actions"
      render={genre => (
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <div>
            <Tooltip placement="top" title="Genre information" arrowPointAtCenter>
              <Icon type="eye" onClick={() => props.handleInformation(genre)} style={{ fontSize: '20px' }} />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Edit" arrowPointAtCenter>
              <Icon
                type="edit"
                onClick={() => props.handleManageGenre(genre, true)}
                style={{ fontSize: '16px', color: '#1890ff' }}
              />
            </Tooltip>
          </div>
          <div>
            <Tooltip placement="top" title="Delete" arrowPointAtCenter>
              <Popconfirm
                placement="bottomLeft"
                title="Are you sure to delete this genre?"
                onConfirm={() => props.onDelete(genre.id)}
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

export default GenresTable;
