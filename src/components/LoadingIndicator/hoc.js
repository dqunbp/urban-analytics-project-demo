import React from 'react'
import Loading from './Loading'

export default (isLoading, LoadingComponent) => Loader => (
    class WrappedComponent extends React.Component{
        render() {
            const loading = !!isLoading || this.props.isLoading
            const LoadingComponent = LoadingComponent || Loading
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