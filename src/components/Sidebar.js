import React from 'react'
import { connect } from 'react-redux'
import PieChart from './PieChart'
import Legend from './Legend'
import Summary from './Summary'
import Actions from './Actions'

import statisticsSelector from '../selectors/populationStats'

export class Sidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        const ref = React.createRef()
        return (
            <div>
                <PieChart ref={ref} columns={this.props.columns} />
                <Legend chartRef={ref} />
                <Summary />
                <Actions />
            </div>
        )
    }
}

const mapStateToProps = (state) => statisticsSelector(state)

export default connect(mapStateToProps)(Sidebar)