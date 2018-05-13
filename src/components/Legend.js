import React from 'react'

import LegendItem from './LegendItem'

export const Legend = (props) => {
    console.log(props.chartRef)
    return (
        <div className="legend">
            <LegendItem name={"name-1"} count={10} />
            <LegendItem name={"name-2"} count={8} />
        </div>
    )
}

export default Legend