import React from 'react'

export const SummaryItem = ({ name, count }) => (
    <div className="list-item">
        <div className="list-item__count">{count}</div>
        <div className="list-item__name">{name}</div>
    </div>
)

export default SummaryItem