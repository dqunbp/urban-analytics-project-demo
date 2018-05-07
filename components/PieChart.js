import React from 'react'
import C3Chart from 'react-c3js'

export const PieChart = ({ columns, colors, onClick, onMouseOver, onMouseOut }) => (
    <C3Chart data={{
        columns: columns,
        colors: colors || {},
        type: 'pie',
        onclick: onClick,
        onmouseover: onMouseOver,
        onmouseout: onMouseOut,
    }} />
)

export default PieChart
