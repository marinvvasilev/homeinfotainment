/* eslint-disable import/default */
import React from 'react';
import { render } from 'react-dom';

export default class GridWidget extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {
        this.state = {
            items: this.props.items || []
        };
    }

    render() {
        let items = this.state.items.filter((i, ind) => {
            return (ind + 1) <= this.props.maxItems;
        });
        // render
        return <div className={this.props.className}>
            <p className="widgetTitle"><span>{this.props.widgetTitle}</span></p>

            {items.map((item, index) => {
                return <div className="col-xs-12 col-sm-6 int" key={index}>
                    <div className="col-xs-12 col-sm-3 icon">
                        {item.icon}
                    </div>
                    <div className="col-xs-12 col-sm-9 wrap">
                        <span className="title">{item.title}</span>
                    </div>
                </div>
            })}
        </div>;
    }
}

GridWidget.defaultProps = {
    items: [],
    className: 'grid-item',
    widgetTitle: 'Grid Item',
    maxItems: 4
}