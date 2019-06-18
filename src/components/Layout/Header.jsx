import React from 'react';
import { Link } from 'react-router-dom';
import { Icon } from 'antd';
import './header.css';

const Header = () => (
  <div className="header">
    <div className="links">
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/manage-books">Books</Link>
      </div>
      <div>
        <Link to="/manage-authors">Authors</Link>
      </div>
      <div>
        <Link to="/manage-genres">Genres</Link>
      </div>
    </div>
    <div className="logo">
      <div>
        <Icon type="read" style={{ fontSize: '45px', marginRight: '10px' }} />
      </div>
      <div>Bokstore</div>
    </div>
  </div>
);

export default Header;
