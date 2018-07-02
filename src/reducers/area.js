import * as types from '../actions'

const areaReducerDefaultState = {
    isFetching: false,
    errorMessage: null,
    features: [],
    selectedArea: null
}

export default (state = areaReducerDefaultState, action) => {
    switch (action.type) {
        case types.FETCH_AREA.REQUEST:
            return {
                ...state,
                isFetching: true,
                selectedArea: action.coordinates
            }
        case types.FETCH_AREA.SUCCESS:
            return {
                ...state,
                isFetching: false,
                features: action.features,
                // selectedArea: action.coordinates
            }
        case types.FETCH_AREA.FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error
            }
        default:
            return state
    }
}