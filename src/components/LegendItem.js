import React from 'react'

import { getColor } from '../constants'

export const LegendItem = ({ name, count, isActive, setFeaturesFilter }) => {
    const color = getColor(name)
    const filterFeature = (name) => {
        setFeaturesFilter(name)
    }
    const legendItemClassName = isActive ? "legend-item" : "legend-item legend-item--muted"
    return (
        <div onClick={() => filterFeature(name)} className={legendItemClassName}>
            <div style={{
                backgroundColor: color,
                boxShadow: '0 0 0 5px ' + color
        }} className="legend-item__count">{count}</div>
            <div className="legend-item__name">{name}</div>
        </div>
    )
}

export default LegendItem