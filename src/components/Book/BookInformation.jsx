import React from 'react';
import { Divider, Row, Col, Tag } from 'antd';
import './books.css';

const BookInformation = ({ book, bookApi }) => {
  const colorGenres = [
    'magenta',
    'red',
    'volcano',
    'orange',
    'gold',
    'lime',
    'green',
    'cyan',
    'blue',
    'geekblue',
    'purple'
  ];
  let hasImage = false;
  if (typeof bookApi.imageLinks !== 'undefined') {
    hasImage = true;
  }
  return (
    <div>
      <Divider />
      <Row align="middle">
        <Col span={4}>
          <img alt="book" src={hasImage ? bookApi.imageLinks.thumbnail : 'no_image.jpg'} width={hasImage ? '' : 140} />
        </Col>
        <Col span={19} offset={1}>
          <h2>Product details</h2>
          <div className="space-text">
            <div>
              <b>Original title:</b> <Tag>{bookApi.title}</Tag>
            </div>
            <div>
              <b>Author{bookApi.authors.length > 1 ? 's' : ''}:</b>{' '}
              {bookApi.authors.map((author, key) => (
                <Tag key={key}>{author}</Tag>
              ))}
            </div>
            <div>
              {bookApi.industryIdentifiers.map((isbn, key) => (
                <span key={key}>
                  <b>{isbn.type}:</b> <Tag color="blue">{isbn.identifier}</Tag>
                </span>
              ))}
            </div>
            <div>
              <b>Genre{book.genres.length > 1 ? 's' : ''}:</b>{' '}
              {book.genres.map(genre => (
                <Tag color={colorGenres[Math.floor(Math.random() * colorGenres.length)]} key={genre.id}>
                  {genre.name}
                </Tag>
              ))}
            </div>
            <div style={{ textAlign: 'justify' }}>
              <b>Description:</b> {book.description}
            </div>
            <div>
              <b>Quantity:</b> {book.quantity} book{book.quantity > 1 ? 's' : ''} on the stock
            </div>
            <div>
              <b>See more:</b>{' '}
              <a href={bookApi.infoLink} target="_blank" rel="noopener noreferrer">
                Book information link
              </a>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookInformation;
