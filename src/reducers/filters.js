const filterDefaultState = {
    features: []
}

export default (state = filterDefaultState, action) => {
    switch (action.type) {
        case 'SET_FEATURES_FILTER':
            let { feature } = action
            if (state.features.indexOf(feature) > -1) {
                let features = state.features.filter(
                    item => item !== feature
                )
                return { features }
            } else {
                let features = state.features.concat(feature)
                return { features }
            }
        case 'CLEAR_FEATURES_FILTER':
            return { features: [] }
        default:
            return state
    }
}