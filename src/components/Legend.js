import React from 'react'

import LegendItem from './LegendItem'

export const Legend = ({ data }) => {
    const legendItems = Object.keys(data).reduce((result, currentItem) => {
        let [name, count] = [currentItem, data[currentItem]]
        result.push(<LegendItem key={name} name={name} count={count} />)
        return result
    }, [])
    return (
        <div className="legend">
            {legendItems}
        </div>
    )
}

export default Legend