import React from 'react'
import PieChart from './PieChart'

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

        return (
            <div>
                <PieChart columns={columns} />
                {/* <Legend /> */}
                {/* <Summary /> */}
                {/* <Actions /> */}
            </div>
        )
    }
}

export default Sidebar