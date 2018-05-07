import React from 'react'

import PieChart from './PieChart'
import Legend from './Legend'
import Summary from './Summary'
import Actions from './Actions'

export class Sidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {

        let columns = [
            ['data1', 100],
            ['data2', 300],
            ['data3', 200]
        ]

        const ref = React.createRef()
        console.log(ref)
        return (
            <div>
                <PieChart ref={ref} columns={columns} />
                <Legend chartRef={ref} />
                <Summary />
                <Actions />
            </div>
        )
    }
}

export default Sidebar