import React from 'react'

import SummaryItem from './SummaryItem'

export const Summary = ({ data }) => {
    const summaryItems = Object.keys(data).reduce((result, currentItem) => {
        let [name, count] = [currentItem, data[currentItem]]
        result.push(<SummaryItem key={name} name={name} count={count} />)
        return result
    }, [])
    return (
        <div className="list">
            <div className="list__header">Summary</div>
            <div>
                {summaryItems}
                {/* <SummaryItem key={'name1'} name={'name'} count={83} />
                <SummaryItem key={'name2'} name={'frames'} count={34} /> */}
            </div>
        </div>
    )
}

export default Summary