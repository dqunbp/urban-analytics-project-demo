import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'


import Map from './Map'
import Sidebar from './Sidebar'
import loadingHoc from './LoadingIndicator'

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


const mapStateToProps = (state) => ({ isLoading: state.area.isFetching })

export default compose(
    connect(mapStateToProps),
    loadingHoc()
)(UrbanAnalyticsApp)