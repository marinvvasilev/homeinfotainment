/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import './styles/header.scss';

const io = require('socket.io-client');
const socket = io();

export default class Header extends React.Component {

  constructor(props) {
    super(props);
    this.props = props || {};
    socket.on('mediachange', (data) => {
      this.setState({
        title: data.title,
        img: data.img || <i className="material-icons">tap_and_play</i>
      });
    })
  }

  navItems() {
    return [
      'Home',
      'News',
      'Calendar',
      'Media Playback'
    ];
  }

  componentWillMount() {
    this.state = {
      title: '',
      img: <i className="material-icons">blur_circular</i>,
      activeMenuItemId: this.props.activeMenuItemId
    };
  }

  render() {
    return <header id="header">
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="brand">
              {this.state.img}
              <span>{this.state.title}</span>
            </div>
          </div>
          <div className="col-md-5 col-sm-7 col-sm-offset-1 col-md-offset-3">
            <ul>
              {this.navItems().map((item, index) => {
                return <li key={index} className={(this.state.activeMenuItemId === index) ? 'active' : ''}>
                  {item}
                </li>
              })}
            </ul>
          </div>
        </div>
      </div>
    </header>;
  }
}

/**
 * Class properties
 */
Header.defaultProps = {
  activeMenuItemId: 0
}