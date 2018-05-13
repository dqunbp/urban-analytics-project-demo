import React from 'react'
import { connect } from 'react-redux'
import PieChart from './PieChart'
import Legend from './Legend'
import Summary from './Summary'
import Actions from './Actions'

import statisticsSelector from '../selectors/populationStats'

export class Sidebar extends React.Component {

    render() {

        const ref = React.createRef()
        const { isAreaSelected, columns, summary, legend } = this.props
        return (
            isAreaSelected ? (
                <div className="message">Select area of interest</div>
            ) : (
                <div>
                    <PieChart ref={ref} columns={columns} />
                    <Legend data={legend} chartRef={ref} />
                    <Summary />
                    <Actions />
                </div>
            )
        )
    }
}

const mapStateToProps = (state) => statisticsSelector(state)

export default connect(mapStateToProps)(Sidebar)