import React from 'react';
import { connect } from 'react-redux';
// import Pie from 'react-chartjs-2/lib';
import {Pie} from 'react-chartjs-2';

import chartSelector from '../selectors/chart'

export class PieExample extends React.PureComponent {

    render() {

        const options = {
            legend: {
                display: false
            }
        };

        const chartProps = {
            ...this.props,
            options
        }

        return (
            <div className="piechart">
                <Pie type={'pie'} {...chartProps} />
            </div>
        );
    }
};

const mapStateToProps = (state) => chartSelector(state, state.filters)

export default connect(mapStateToProps)(PieExample)