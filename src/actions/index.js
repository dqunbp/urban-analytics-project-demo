const REQUEST = 'REQUEST'
const SUCCESS = 'SUCCESS'
const FAILURE = 'FAILURE'

function createRequestTypes(base) {
    return [REQUEST, SUCCESS, FAILURE].reduce((acc, type) => {
        acc[type] = `${base}_${type}`
        return acc
    }, {})
}

function action(type, payload = {}) {
    return { type, ...payload }
}

/**
|--------------------------------------------------
| LOAD AREA DATA
|--------------------------------------------------
*/

export const LOAD_AREA_DATA = 'LOAD_AREA_DATA'
export const loadAreaData = (coordinates) => action(LOAD_AREA_DATA, { coordinates })

export const FETCH_AREA = createRequestTypes('FETCH_AREA')
export const area = {
    request: (coordinates) => action(FETCH_AREA[REQUEST], { coordinates }),
    success: (features) => action(FETCH_AREA[SUCCESS], { features }),
    failure: (error) => action(FETCH_AREA[FAILURE], { error })
}

/**
|--------------------------------------------------
| CLEAR DATA
|--------------------------------------------------
*/

export const CLEAR_DATA = 'CLEAR_DATA'
export const clearData = () => action(CLEAR_DATA, { })

/**
|--------------------------------------------------
| SET USER MESSAGE
|--------------------------------------------------
*/

export const SET_USER_MESSAGE = 'SET_USER_MESSAGE'
export const setUserMessage = (message) => action(SET_USER_MESSAGE, { message })