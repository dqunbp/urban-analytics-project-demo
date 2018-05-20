import React from 'react'
import { connect } from 'react-redux'
import PieChart from './PieChart'
import Legend from './Legend'
import Summary from './Summary'
import Actions from './Actions'

import { setFeaturesFilter } from '../actions/filters'
import statisticsSelector from '../selectors/legend'

export class Sidebar extends React.Component {
    render() {
        const ref = React.createRef()
        const { isAreaSelected, columns, colors, summary, legend, setFeaturesFilter } = this.props
        return (
            isAreaSelected ? (
                <div className="message">Select area of interest</div>
            ) : (
                    <div>
                        <PieChart ref={ref} />
                        <Legend setFeaturesFilter={setFeaturesFilter} data={legend} chartRef={ref} />
                        <Summary />
                        <Actions />
                    </div>
                )
        )
    }
}

const mapStateToProps = (state) => statisticsSelector(state, state.filters)

export default connect(mapStateToProps, { setFeaturesFilter })(Sidebar)