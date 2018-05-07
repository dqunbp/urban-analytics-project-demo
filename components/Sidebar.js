import React from 'react'

export class Sidebar extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <div>
                <PieChart />
                <Summary />
                <Actions />
            </div>
        )
    }
}