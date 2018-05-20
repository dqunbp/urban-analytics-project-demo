import React, { forwardRef } from 'react'
import { connect } from 'react-redux'

import chartSelector from '../selectors/chart'
import C3Chart from './C3Chart'


export const PieChart = (props) => (
    <C3Chart
        className="piechart"
        // ref={props.myForwardedRef}
        data={{
            labels: false,
            columns: props.columns,
            colors: props.colors || {},
            type: 'pie',
            onclick: props.onClick,
            onmouseover: props.onMouseOver,
            onmouseout: props.onMouseOut,
        }}
        unloadBeforeLoad={true}
        legend={{ show: false }}
        pie={{
            label: {
                show: false
            }
        }}
    />
)

const mapStateToProps = (state) => chartSelector(state, state.filters)

const ConnectedPieChart = connect(
    mapStateToProps
)(PieChart)

export default ConnectedPieChart

// export default forwardRef((props, ref) =>
//     <ConnectedPieChart {...props} myForwardedRef={ref} />
// )
// export default connect(mapStateToProps)(PieChart)
