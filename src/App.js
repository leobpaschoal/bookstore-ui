import React from 'react';
import Home from './components/Layout/Home';
import NoMatch from './components/Layout/NoMatch';
import ManageBooks from './components/Book/ManageBooks';
import ManageAuthors from './components/Author/ManageAuthors';
import ManageGenres from './components/Genre/ManageGenres';
import { Layout } from 'antd';
import './App.css';
import 'antd/dist/antd.css';
import Header from './components/Layout/Header';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const { Content, Footer } = Layout;

function App() {
  return (
    <Router>
      <Header />
      <Content style={{ padding: '0 50px' }}>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/manage-books" exact component={ManageBooks} />
          <Route path="/manage-authors" exact component={ManageAuthors} />
          <Route path="/manage-genres" exact component={ManageGenres} />
          <Route path="*" exact component={NoMatch} />
        </Switch>
      </Content>
      <Footer
        style={{
          marginTop: '5px',
          textAlign: 'center',
          backgroundColor: 'rgb(7, 15, 65)',
          color: 'white'
        }}
      >
        Bookstore by{' '}
        <a href="https://github.com/leobpaschoal" target="_blank" rel="noopener noreferrer">
          leobpaschoal
        </a>
      </Footer>
    </Router>
  );
}

export default App;
