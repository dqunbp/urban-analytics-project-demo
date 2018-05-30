import React from 'react'
import { connect } from 'react-redux'
import Pie from 'react-chartjs/lib/Pie'

import chartSelector from '../selectors/chart'

export const PieChart = ({ data }) => (
    <Pie className="piechart" data={data} />
)

const mapStateToProps = (state) => chartSelector(state, state.filters)

export default connect(mapStateToProps)(PieChart)