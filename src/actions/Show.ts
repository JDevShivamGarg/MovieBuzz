import { ActionCreator } from ".";
import { Cast, Show } from "../models/Show";

export const SHOWS_LOADED = 'SHOWS_LOADED';
export const SHOW_QUERY_CHANGED = "SHOW_QUERY_CHANGED"

export const ShowLoadedActions: ActionCreator<{shows: Show[]}> = (shows: Show[]) => ({
  type: SHOWS_LOADED,
  payload: shows,
});


export const ShowQueryChangeAction:ActionCreator<string> = (query:string) =>({
    type: SHOW_QUERY_CHANGED,
    payload: query,
})

export const FETCH_CAST_DETAILS = 'FETCH_CAST_DETAILS';
export const UPDATE_CAST_DETAILS = 'UPDATE_CAST_DETAILS';
export const FETCH_SHOW_DETAILS = "FETCH_SHOW_DETAILS";
export const SHOW_DETAILS_SUCCESS = "SHOW_DETAILS_SUCCESS";
export const SHOW_DETAILS_FAILURE = "SHOW_DETAILS_FAILURE";

export const fetchShowDetails: ActionCreator<string> = (showId: string) => ({
  type: FETCH_SHOW_DETAILS,
  payload: showId,
});

export const showDetailsSuccess: ActionCreator<Show> = (show: Show) => ({
  type: SHOW_DETAILS_SUCCESS,
  payload: show,
});

export const showDetailsFailure: ActionCreator<string> = (error: string) => ({
  type: SHOW_DETAILS_FAILURE,
  payload: error,
});
export const SHOW_ID_UPDATE = "SHOW_ID_UPDATE";

export const updateShowId: ActionCreator<string> = (showId: string) => ({
  type: SHOW_ID_UPDATE,
  payload: showId,
});

export const fetchCastDetails: ActionCreator<Cast[]> = (cast: Cast[]) => ({
  type: FETCH_CAST_DETAILS,
  payload: cast,
});
export const updateCastDetails: ActionCreator<Cast[]> = (cast: Cast[]) => ({
  type: UPDATE_CAST_DETAILS,
  payload: cast,
});