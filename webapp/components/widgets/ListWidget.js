/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

export default class ListWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            items: this.props.items || []
        };
    }

    render() {
        // render
        return <div className={this.props.className}>
            <p className="widgetTitle"><span>{this.props.widgetTitle}</span></p>
            <ul>
                {this.state.items.map((item, index) => {
                    return <li key={index}>
                        <span className="icon">
                            {item.icon}
                        </span>
                        <p className="wrap">
                            <span className="title">{item.title}</span>
                            <span className="lead">{item.content}</span>
                        </p>
                    </li>
                })}
            </ul>
        </div>;
    }
}

ListWidget.defaultProps = {
    items: [],
    className: 'list-item',
    widgetTitle: 'List Item'
}