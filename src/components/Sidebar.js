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

        let columns = [
            ['data1', 100],
            ['data2', 300],
            ['data3', 200]
        ]

        const ref = React.createRef()
        console.log(ref)
        return (
            <div>
                <PieChart ref={ref} columns={columns} />
                <Legend chartRef={ref} />
                <Summary />
                <Actions />
            </div>
        )
    }
}

const mapStateToProps = (state) => statisticsSelector(state)

export default connect(mapStateToProps)(Sidebar)