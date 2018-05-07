import React from 'react'

import SummaryItem from './SummaryItem'

export const Summary = (props) => {
    return (
        <div className="list">
            <div className="list__header">Summary</div>
            <div>
                <SummaryItem name={"name-1"} count={10} />
                <SummaryItem name={"name-2"} count={8} />
            </div>
        </div>
    )
}

export default Summary