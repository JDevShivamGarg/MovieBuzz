import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchShows, fetchShowDetails, fetchCastDetails } from '../thunks';
import { Cast, Show } from '../models/Show';

export type State = {
  shows: { [showId: number]: Show };
  query: string;
  showDetails: Show | null;
  error: string | null;
  showId: string | null;
  query_shows: { [query: string]: number[] };
  loading: boolean;
  show_loading: { [showId: string]: boolean };
  castDetails: Cast[];
};

const initialState: State = {
  shows: {},
  query: '',
  showDetails: null,
  error: null,
  showId: null,
  query_shows: {},
  loading: false,
  show_loading: {},
  castDetails: [],
};

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    showQueryChanged(state, action) {
      state.query = action.payload;
      state.loading = true;
    },
    updateShowId(state, action: PayloadAction<string>) {
        state.showId = action.payload;
      },
  },
  extraReducers: (builder) => {
    builder
  
      .addCase(fetchShows.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShows.fulfilled, (state, action) => {
        state.loading = false;
        const shows = action.payload;
        const query = state.query;
        const normalizedShows = shows.reduce((acc, show) => {
          acc[show.id] = show;
          return acc;
        }, {} as { [key: number]: Show });

        state.shows = { ...state.shows, ...normalizedShows };
        state.query_shows[query] = shows.map((show) => show.id);
      })
      .addCase(fetchShows.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to search shows';
      })

      .addCase(fetchShowDetails.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchShowDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.showDetails = action.payload;
      })
      .addCase(fetchShowDetails.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to fetch show details';
      })

      .addCase(fetchCastDetails.fulfilled, (state, action) => {
        state.castDetails = action.payload;
      })
      .addCase(fetchCastDetails.rejected, (state) => {
        state.error = 'Failed to fetch cast details';
      });
  },
});

export const { showQueryChanged , updateShowId } = showSlice.actions;

export default showSlice.reducer;
