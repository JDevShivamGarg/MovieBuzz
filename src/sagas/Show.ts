import {call, put} from 'redux-saga/effects'
import { Action } from '../actions'
import { fetchShowCastApi, fetchShowDetailsApi, searchShows } from '../api'
import {showDetailsFailure, showDetailsSuccess, ShowLoadedActions, updateCastDetails} from '../actions/Show'

export function* fetchShows(action:Action) : Generator<any, any> {
    const shows = yield call(searchShows, action.payload)
    yield put(ShowLoadedActions(shows))
}   
  
export function* fetchShowDetailsSaga(action: Action): Generator<any, any> {
    try {
        const response = yield call(fetchShowDetailsApi, action.payload);
        yield put(showDetailsSuccess(response));
    } catch (error) {
        yield put(showDetailsFailure("Failed to fetch show details"));
    }
}

export function* fetchCastDetailsSaga(action: Action): Generator<any, any>{
    console.log("fetchCastDetailsSaga called", action.payload)
    const response = yield call(fetchShowCastApi, action.payload);
    yield put(updateCastDetails(response));
}