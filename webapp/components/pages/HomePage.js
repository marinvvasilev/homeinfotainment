/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';
import '../styles/home-page.scss';

// Import Widgets
import ClockWidget from '../widgets/ClockWidget';
import WeatherWidget from '../widgets/WeatherWidget';
import ListWidget from '../widgets/ListWidget';
import GridWidget from '../widgets/GridWidget';
import PlayerWidget from '../widgets/PlayerWidget';

const io = require('socket.io-client');
const socket = io();

export default class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.interval;
  }

  componentWillMount() {
  }

  dummyData(news = false) {
    return [
      {
        icon: (!news)? <i className="material-icons">mail</i> : <i className="material-icons">new_releases</i>,
        title: 'Message title',
        content: 'I would like to provide a more neat solution to the problem if I may.The accepted answer is very good. But I would have done it like this.'
      },
      {
        icon: (!news)? <i className="material-icons">mail</i> : <i className="material-icons">new_releases</i>,
        title: 'Message title',
        content: 'I would like to provide a more neat solution to the problem if I may.The accepted answer is very good. But I would have done it like this.'
      },
      {
        icon: (!news)? <i className="material-icons">mail</i> : <i className="material-icons">new_releases</i>,
        title: 'Message title',
        content: 'I would like to provide a more neat solution to the problem if I may.The accepted answer is very good. But I would have done it like this.'
      },
      {
        icon: (!news)? <i className="material-icons">mail</i> : <i className="material-icons">new_releases</i>,
        title: 'Message title',
        content: 'I would like to provide a more neat solution to the problem if I may.The accepted answer is very good. But I would have done it like this.'
      },
      {
        icon: (!news)? <i className="material-icons">mail</i> : <i className="material-icons">new_releases</i>,
        title: 'Message title',
        content: 'I would like to provide a more neat solution to the problem if I may.The accepted answer is very good. But I would have done it like this.'
      }
    ];
  }


  render() {
    return <section>
      <section id="newsBlock">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4" style={{ height: '100%' }}>
              <ClockWidget />
            </div>
            <div className="col-md-8 hidden-sm">
              <WeatherWidget />
            </div>
          </div>

        </div>
      </section>
      <section id="daily">
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <div className="newsItems">
                <GridWidget items={this.dummyData(true)} widgetTitle="Global News" />
              </div>
              <div className="playerWrapper">
                <PlayerWidget />
              </div>
            </div>
            <div className="col-md-4 calendarItems">
              <ListWidget items={this.dummyData()} widgetTitle="::: TODO :::" />
            </div>
            <div className="col-md-4 calendarItems">
              <ListWidget items={this.dummyData()} widgetTitle="::: REMEMBER :::" />
            </div>
          </div>
        </div>
      </section>
    </section>;
  }
}
