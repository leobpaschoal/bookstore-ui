import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Col, Row, Divider, Icon } from 'antd';

const home = () => (
  <div style={{ padding: '30px' }}>
    <div style={{ textAlign: 'center' }}>
      <h1>
        Welcome to Bookstore <Icon type="read" />
      </h1>
    </div>
    <Divider />
    <p>In this site you can create books with genres and authors.</p>
    You can:
    <ul>
      <li>Manage one or many books of your bookstore, like create, edit and delete</li>
      <li>Create and edit authors</li>
      <li>Create genres to link in each book</li>
    </ul>
    <Row gutter={16}>
      <Col span={8}>
        <Card title="Manage books" bordered>
          Click <Link to="/manage-books">here</Link> to manage all books
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Manage authors" bordered>
          Click <Link to="/manage-authors">here</Link> to manage authors
        </Card>
      </Col>
      <Col span={8}>
        <Card title="Manage genres" bordered>
          Click <Link to="/manage-genres">here</Link> to manage genres
        </Card>
      </Col>
    </Row>
  </div>
);

export default home;
