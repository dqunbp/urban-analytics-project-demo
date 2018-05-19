import React from 'react'

import { getColor } from '../constants'

export const LegendItem = ({ name, count }) => {
    const color = getColor(name)
    return (
        <div className="legend-item">
            <div style={{
                backgroundColor: color,
                boxShadow: '0 0 0 5px ' + color
        }} className="legend-item__count">{count}</div>
            <div className="legend-item__name">{name}</div>
        </div>
    )
}

export default LegendItem