/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import Header from './Header';
import Page from './Page';
// import Footer from './Footer';

const io = require('socket.io-client');
const socket = io();

export default class App extends React.Component {

  constructor() {
    super();
    socket.on('userLogin', (username) => {
      this.setState({
        message: 'Oh, hello there, ' + username + '!'
      }, () => {
        socket.emit('username', username);
      });
    })
  }

  componentWillMount() {
    this.state = {
      message: 'SAY HELLO :) '
    };
  }

  render() {
    return <section id="mainSection">
      <Header />
      <Page />
    </section>;
  }
}
