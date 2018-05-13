import React from 'react'
import C3Chart from 'react-c3js'

export const PieChart = React.forwardRef(
    // ({ columns, colors, onClick, onMouseOver, onMouseOut }, ref) => (
    (props, ref) => {
        return (<C3Chart
            className="piechart"
            ref={ref}
            data={{
                columns: props.columns,
                colors: props.colors || {},
                type: 'pie',
                onclick: props.onClick,
                onmouseover: props.onMouseOver,
                onmouseout: props.onMouseOut,
            }}
            legend={{ show: false }}
        />)
    }
)

export default PieChart
