import React from 'react';
import {BrowserRouter,Switch, Route, Redirect } from 'react-router-dom';
import {Container, Navbar, Nav, Jumbotron, Row, Col } from 'react-bootstrap';
import {connect} from 'react-redux';
import PostList from './components/reddit/post-list';
import Postview from './components/reddit/post-view';
import NotFound from './components/not-found';
import Loader from './components/loader';
import config from './config';
import AccessDenied from './components/access-denied';

import './style/index.scss';

const App = ({isFetching, errorFetching, subreddit}) => {

  return (    
    <div className='App'>
    <Loader loading={isFetching}/>
    <Container className='main-container'>
      <Jumbotron className="react-reddit-header">
        <Row>
          <Col xs={12}>
            <h1 className="text-center">React Reddit Client</h1>
          </Col>
        </Row>
      </Jumbotron>

      {subreddit && 
      <Navbar>
        <Nav.Link href={`/${subreddit}/best`}>Best</Nav.Link>
        <Nav.Link href={`/${subreddit}/hot`}>Hot</Nav.Link>
        <Nav.Link href={`/${subreddit}/new`}>New</Nav.Link>
        <Nav.Link href={`/${subreddit}/controversial`}>Controversial</Nav.Link>
        <Nav.Link href={`/${subreddit}/top`}>Top</Nav.Link>
        <Nav.Link href={`/${subreddit}/rising`}>Rising</Nav.Link>
      </Navbar >
      }
      <BrowserRouter>
        <Switch>
          <Route path='/view/:id' component={errorFetching? AccessDenied : Postview} exact />
          <Redirect from='/r/:subreddit/' to='/r/:subreddit/hot' exact={true}/>
          <Route path='/r/:subreddit/(best|hot|new|controversial|top|rising)' component={errorFetching? AccessDenied : PostList} exact />
          <Route path='/access-denied' component={AccessDenied} />
          <Redirect from='/' to={`/r/${config.default.subreddit}/hot`} exact={true}/>
          <Route path='' component={NotFound} exact={true}/>
        </Switch>
      </BrowserRouter>
    </Container>
    </div>
  );
}

const mapStateToProps = state =>({
  subreddit: state.post.subreddit,
  errorFetching: state.post.errorFetching,
  isFetching: state.post.isFetching
})

export default  connect(mapStateToProps) (App);
