import React from 'react'
import C3Chart from 'react-c3js'

export const PieChart = React.forwardRef(
    ({ columns, colors, onClick, onMouseOver, onMouseOut }, ref) => (
        <C3Chart
            ref={ref}
            data={{
                columns: columns,
                colors: colors || {},
                type: 'pie',
                onclick: onClick,
                onmouseover: onMouseOver,
                onmouseout: onMouseOut,
            }}
            legend={{ show: false }}
        />
    )
)

export default PieChart
