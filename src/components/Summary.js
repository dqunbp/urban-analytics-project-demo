import React from 'react'
import { connect } from 'react-redux'

import summarySelector from '../selectors/summary'
import SummaryItem from './SummaryItem'

export const Summary = ({ summary }) => (
    <div className="list">
        <div className="list__header">Summary</div>
        <div>
            {summary.map(
                ({name, count}) => <SummaryItem key={name} name={name} count={count} />
            )}
        </div>
    </div>
)

const mapStateToProps = (state) => summarySelector(state, state.filters)

export default connect(mapStateToProps)(Summary)