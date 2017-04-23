/* eslint-disable import/default */
import React from 'react';  
import { render } from 'react-dom';  
import App from './components/App';
import './app.scss';

class Index extends React.Component {
  render () {
    return <App/>;
  }
}

render(<Index/>, document.getElementById('app'));