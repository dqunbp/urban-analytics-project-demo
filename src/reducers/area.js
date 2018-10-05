import * as types from '../actions'

const areaReducerDefaultState = {
    isFetching: false,
    errorMessage: null,
    features: [],
    selectedArea: null,
    userMessage: 'Select area of interest'
}

export default (state = areaReducerDefaultState, action) => {
    switch (action.type) {
        // FETCH AREA DATA
        case types.FETCH_AREA.REQUEST:
            return {
                ...state,
                isFetching: true,
                selectedArea: action.coordinates,
                userMessage: 'Heights estimating. Please wait..'
            }
        case types.FETCH_AREA.SUCCESS:
            return {
                ...state,
                isFetching: false,
                features: action.features,
                userMessage: null
            }
        case types.FETCH_AREA.FAILURE:
            return {
                ...state,
                isFetching: false,
                errorMessage: action.error,
                userMessage: 'Something went wrond, please try again'
            }
        // CLEAR DATA
        case types.CLEAR_DATA:
            return {
                ...areaReducerDefaultState
            }
        // SET USER MESSAGE
        case types.SET_USER_MESSAGE:
            return {
                ...state,
                userMessage: action.message
            }
        default:
            return state
    }
}