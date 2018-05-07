import React from 'react'


import Map from './Map'
import Sidebar from './Sidebar'

export class UrbanAnalyticsApp extends React.Component {
    render() {
        return (
            <div className="app">
                <div className="sibebar">
                    <Sidebar />
                </div>
                <div className="map">
                    <Map />
                </div>
            </div>
        )
    }
}

export default UrbanAnalyticsApp