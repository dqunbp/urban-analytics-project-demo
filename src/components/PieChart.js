import React from 'react'
import C3Chart from './C3Chart'


export const PieChart = React.forwardRef(
    (props, ref) => {
        return (
            <C3Chart
                className="piechart"
                ref={ref}
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
    }
)

export default PieChart
