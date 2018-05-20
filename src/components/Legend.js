import React from 'react'

import LegendItem from './LegendItem'

export const Legend = ({ data, chartRef, setFeaturesFilter }) => (
    <div className="legend">
        {data.map(
            ({ name, count, isActive }) => 
                <LegendItem 
                    key={name}
                    name={name}
                    count={count}
                    isActive={isActive}
                    setFeaturesFilter={setFeaturesFilter}
                />
        )}
    </div>
)


export default Legend