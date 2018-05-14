import React from 'react'

import LegendItem from './LegendItem'

export const Legend = ({ data }) => (
    <div className="legend">
        {data.map(
            ({ name, count }) => <LegendItem key={name} name={name} count={count} />
        )}
    </div>
)


export default Legend