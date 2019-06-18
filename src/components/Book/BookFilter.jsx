import React from 'react';
import { Input, Col, Select, Row } from 'antd';

const { Option } = Select;

const BookFilter = props => (
  <Row style={{ marginBottom: '15px' }}>
    <Col span={4}>
      Filter by Author:
      <Input value={props.inputAuthor} onChange={e => props.filterByAuthor(e.target.value)} />
    </Col>
    <Col span={4} offset={1}>
      Filter by Title:
      <Input value={props.inputTitle} onChange={e => props.filterByTitle(e.target.value)} />
    </Col>
    <Col span={4} offset={1}>
      Filter by Isbn:
      <Input value={props.inputIsbn} onChange={e => props.filterByIsbn(e.target.value)} />
    </Col>
    <Col span={9} offset={1}>
      Filter by Genres:
      <Select
        mode="multiple"
        onChange={props.filterByGenres}
        value={props.inputGenres}
        style={{
          width: '100%'
        }}
      >
        {props.genres.map(genre => (
          <Option key={genre.name}>{genre.name}</Option>
        ))}
      </Select>
    </Col>
  </Row>
);

export default BookFilter;
