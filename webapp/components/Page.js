/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
// Import pages
import HomePage from './pages/HomePage';

const io = require('socket.io-client');
const socket = io();

export default class Page extends React.Component {

  constructor(props) {
    super(props);
    this.props = props || {};
    socket.on('pagechange', (data) => {
      let pageItem;
      this.setState({
        page: data,
      });
    })
  }

  componentWillMount() {
    this.state = {
      page: 'home'
    };
  }

  /**
   * Determines which page to display
   */
  _determinePage() {
    let pageComponent;
    switch (this.state.page) {
      case 'home':
        pageComponent = <HomePage />;
        break;
      default:
        pageComponent = <HomePage />;
    }
    return pageComponent;
  }

  render() {
    return this._determinePage();
  }
}