import React from 'react'

export const LegendItem = ({ name, count }) => (
    <div className="legend-item">
        <div className="legend-item__count">{count}</div>
        <div className="legend-item__name">{name}</div>
    </div>
)

export default LegendItem