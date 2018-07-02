import React from 'react'
import Loading from './Loading'

export default (isLoading, loadingComponent) => Loader => (
    class WrappedComponent extends React.Component{
        render() {
            const loading = !!isLoading || this.props.isLoading
            const LoadingComponent = loadingComponent || Loading
            return (
                <div className="item-loader" >
                    {loading  && 
                        <div className="item-loader__mask">
                            <LoadingComponent />
                        </div>
                    }
                    <Loader {...this.props} />
                </div>
            )
        }
    }
)