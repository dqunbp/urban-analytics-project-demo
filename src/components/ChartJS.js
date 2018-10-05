import React from 'react'
import { connect } from 'react-redux'
import Pie from 'react-chartjs/lib/pie'

import chartSelector from '../selectors/chart'

export const PieChart = ({ data, redraw=false }) => (
    <Pie className="piechart" data={data} redraw={redraw} />
)

const mapStateToProps = (state) => chartSelector(state, state.filters)

export default connect(mapStateToProps)(PieChart)