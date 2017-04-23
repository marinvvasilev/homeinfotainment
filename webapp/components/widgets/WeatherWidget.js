/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

export default class WeatherWidget extends React.Component {

    constructor(props) {
        super(props);
        this.interval;
    }

    componentWillMount() {
        const date = new Date();
        this.state = {
            temp: 9,
            min: 5,
            max: 15,
            icon: <i className="wi wi-night-alt-cloudy"></i>,
            Mon: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Tue: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Wed: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Thur: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Fri: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Sat: {
                icon: <i className="wi wi-night-alt-cloudy"></i>,
                max: 9,
                min: 10,
            },
            Sun: {
                icon: <i className="wi wi-night-sleet"></i>,
                max: 9,
                min: 10,
            },
        };
    }

    render() {
        // render
        return <div className="weather">
            <div className="wrapper row">

                <div className="forecast col-md-3">
                    <div className="center">
                        <span className="current-temp">
                            {this.state.temp} <sup>o</sup>
                        </span>
                        {this.state.icon}
                        <ul className="min-max">
                            <li>
                                <span className="min">{this.state.min} <sup>o</sup></span>
                            </li>
                            <li>
                                {this.state.max} <sup>o</sup>
                            </li>
                            <li>
                                <span className="city">Sofia, Bulgaria</span>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="week col-md-9">
                    <ul className="item">
                        <li>
                            {this.state.Mon.icon}
                        </li>
                        <li>
                            {this.state.Mon.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Mon.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Tue.icon}
                        </li>
                        <li>
                            {this.state.Tue.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Tue.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Wed.icon}
                        </li>
                        <li>
                            {this.state.Wed.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Wed.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Thur.icon}
                        </li>
                        <li>
                            {this.state.Thur.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Thur.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Fri.icon}
                        </li>
                        <li>
                            {this.state.Fri.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Fri.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Sat.icon}
                        </li>
                        <li>
                            {this.state.Sat.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Sat.min} <sup>o</sup></span>
                        </li>
                    </ul>
                    <ul className="item">
                        <li>
                            {this.state.Sun.icon}
                        </li>
                        <li>
                            {this.state.Sun.max} <sup>o</sup>
                        </li>
                        <li>
                            <span className="min">{this.state.Sun.min} <sup>o</sup></span>
                        </li>
                    </ul>
                </div>

            </div>
        </div>;
    }
}