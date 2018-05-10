import { call, put, take, all, fork, takeEvery, takeLatest } from 'redux-saga/effects'

import { api } from './api'
import { area } from './actions'
import * as actions from './actions'

function* loadArea(coordinates) {
    try {
        yield put(area.request(coordinates))
        const response = yield call(api.fetchArea, coordinates)
        yield put(area.success(response.data))
    } catch (error) {
        yield put(area.failure(error))
    }
}

function* watchALoadArea() {
    yield takeLatest(actions.LOAD_AREA_DATA, loadArea)
}

export default function* root() {
    yield all([
        fork(watchALoadArea)
    ])
}