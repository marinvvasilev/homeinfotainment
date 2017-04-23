/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

import '../styles/player-widget.scss';

const io = require('socket.io-client');
const socket = io();

export default class PlayerWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            title: this.props.title || '',
            content: this.props.content || ''
        };
    }

    render() {
        // render
        return <div id="playerInterface">
            <h4 className="text-left">{this.state.title}</h4>
            {this.state.content}
        </div>;
    }
}


PlayerWidget.defaultProps = {
    title: 'Miltimedia player is idle ...',
    content: <div className="iconWrap">
        <i className="material-icons">radio</i>
        <i className="material-icons">queue_play_next</i>
        <span>Choose what media to play. Preview will be shown here!</span>
    </div>
}