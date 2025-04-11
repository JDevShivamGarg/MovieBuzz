import { createSelector } from 'reselect';
import { RootState } from '../store';

export const showStateSelector = (state: RootState) => state.shows;

export const showQuerySelector = createSelector(
  showStateSelector,
  (showState) => showState.query
);

export const showsLoadingSelector = createSelector(
  showStateSelector,
  (showState) => showState.loading
);

export const castDetailsSelector = createSelector(
  showStateSelector,
  (showState) => showState.castDetails
);

export const showMapSelector = createSelector(
  showStateSelector,
  (showState) => showState.shows
);

export const queryShowMapSelector = createSelector(
  showStateSelector,
  (showState) => showState.query_shows
);

export const showSelector = createSelector(
  showMapSelector,
  showQuerySelector,
  queryShowMapSelector,
  (showState, query, queryShowMap) =>
    queryShowMap[query] ? queryShowMap[query].map((showId) => showState[showId]) : []
);
