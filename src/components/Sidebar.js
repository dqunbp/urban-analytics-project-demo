import React from 'react'
import { connect } from 'react-redux'
import Legend from './Legend'
import Summary from './Summary'
import Actions from './Actions'

import PieChart from './ChartJS'
import { setFeaturesFilter } from '../actions/filters'
import statisticsSelector from '../selectors/legend'

export class Sidebar extends React.Component {

    componentWillReceiveProps(nextProps) {
        this.redraw = false
        if (this.props.isFetching === true && nextProps.isFetching === false){
            this.redraw = true
            console.log('REDRAW!!!')
        }
        console.log('====================================')
        console.log(this.props)
        console.log(nextProps)
        console.log('====================================')
    }

    render() {
        const { isAreaSelected, columns, colors, summary, legend, setFeaturesFilter } = this.props
        const redraw = this.redraw
        return (
            !isAreaSelected ? (
                <div className="message">Select area of interest</div>
            ) : (
                    <div>
                        <PieChart redraw={redraw} />
                        <Legend setFeaturesFilter={setFeaturesFilter} data={legend} />
                        <Summary />
                        <Actions />
                    </div>
                )
        )
    }
}

const mapStateToProps = (state) => statisticsSelector(state, state.filters)

export default connect(mapStateToProps, { setFeaturesFilter })(Sidebar)