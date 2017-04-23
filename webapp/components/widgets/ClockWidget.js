/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

export default class ClockWidget extends React.Component {

    constructor(props) {
        super(props);
        this.interval;
    }

    componentWillMount() {
        const date = new Date();
        this.state = {
            hour: date.getHours(),
            minute: (date.getMinutes()<10?'0':'') + date.getMinutes(),
            day: `${getDayOfWeek(date.getDay())} ${date.getDate()} ${getMonth(date.getMonth())}`,
            year: date.getUTCFullYear()
        };
    }

    _refreshClock() {
        let self = this;
        if (!this.interval) {
            this.interval = setInterval(() => {
                const date = new Date();
                self.setState({
                    hour: date.getHours(),
                    minute: (date.getMinutes()<10?'0':'') + date.getMinutes(),
                    day: `${getDayOfWeek(date.getDay())} ${date.getDate()} ${getMonth(date.getMonth())}`,
                    year: date.getUTCFullYear()
                });
            }, 60 * 1000)
        }
    }

    render() {
        // Start clock refresh cycle
        this._refreshClock();
        // render
        return <div className="clock">
            <div className="wrapper">
                <span className="time">
                    <strong>{this.state.hour} </strong>
                    : {this.state.minute}
                </span>
                <span className="date">
                    {this.state.day}, {this.state.year}
                </span>
            </div>
        </div>;
    }
}

/**
 * Returns the name of month
 * @param {int} month the ID of the month starting from 0 - 11  
 */
function getMonth(month) {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'June', 'July', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    return months[month];
}

/**
 * Retunrs the name of day
 * @param {id} day the ID of the day starting 0 - 7 (where 0 is Sunday)
 */
function getDayOfWeek(day) {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'FRI', 'Sat'];
    return days[day];
}