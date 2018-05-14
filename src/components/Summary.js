import React from 'react'

import SummaryItem from './SummaryItem'

export const Summary = ({ data }) => (
    <div className="list">
        <div className="list__header">Summary</div>
        <div>
            {data.map(
                ({name, count}) => <SummaryItem key={name} name={name} count={count} />
            )}
        </div>
    </div>
)


export default Summary