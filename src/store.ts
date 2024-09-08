import { applyMiddleware, combineReducers , createStore} from "redux";
import ShowReducer from "./reducers/Show";
import createSagaMiddleware from "redux-saga";
import { FETCH_CAST_DETAILS, FETCH_SHOW_DETAILS, SHOW_QUERY_CHANGED } from "./actions/Show";
import { fetchCastDetailsSaga, fetchShowDetailsSaga, fetchShows } from "./sagas/Show";
import { takeEvery, takeLatest, debounce } from "redux-saga/effects";

const reducer = combineReducers({
    shows:ShowReducer
});

function* rootSaga(){
        yield debounce(200,SHOW_QUERY_CHANGED,fetchShows);
        yield takeLatest(FETCH_SHOW_DETAILS, fetchShowDetailsSaga);
        yield takeEvery(FETCH_CAST_DETAILS, fetchCastDetailsSaga);
}

const sagaMiddleware = createSagaMiddleware()


const store = createStore(reducer,applyMiddleware(sagaMiddleware))
sagaMiddleware.run(rootSaga)
export type State = ReturnType<typeof reducer>
export default store;