import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'


import Map from './Map'
import Sidebar from './Sidebar'
import loadingHoc from './LoadingIndicator'

export class UrbanAnalyticsApp extends React.Component {

    state = {
        isSidebarOpened: false
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.isFeaturesSelected === false && nextProps.isFeaturesSelected === true) {
            this.setState(() => ({ isSidebarOpened: true }))
        }
    }

    handleSidebarClick = () => {
        const { isSidebarOpened } = this.state
        const { isFeaturesSelected } = this.props
        if (isFeaturesSelected === true && isSidebarOpened === false) {
            this.setState(() => ({ isSidebarOpened: true }))
        }
    }

    render() {
        const { isSidebarOpened } = this.state
        const { isFeaturesSelected } = this.props
        return (
            <div className="app">
                <div
                    className={"sibebar " + (isFeaturesSelected && isSidebarOpened ? "sidebar--active" : "")}
                    onClick={() => this.handleSidebarClick()}
                    // onTouchEnd={() => this.handleSidebarClick()}
                >
                    {isFeaturesSelected && isSidebarOpened ? (
                        <div
                            className="close-button"
                            onClick={() => this.setState(() => ({ isSidebarOpened: false }))}
                            // onTouchEnd={() => this.setState(() => ({ isSidebarOpened: false }))}
                        ></div>
                    ) : undefined
                    }
                    {isFeaturesSelected === true && isSidebarOpened === false 
                        ? 
                        <div className="message">Show statistics</div>
                        :
                        <Sidebar /> 
                    }
                </div>
                <div className="map">
                    <Map />
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    let isLoading = state.area.isFetching
    let { userMessage } = state.area
    let isFeaturesSelected = userMessage === null //state.area.features.length > 0
    return {
        isLoading,
        isFeaturesSelected
    }
}

export default compose(
    connect(mapStateToProps),
    loadingHoc()
)(UrbanAnalyticsApp)