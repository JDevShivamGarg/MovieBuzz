import { createAsyncThunk } from '@reduxjs/toolkit';
import { fetchShowCastApi, fetchShowDetailsApi, searchShows } from './api';


export const fetchShows = createAsyncThunk('shows/fetchShows', async (keyword: string) => {
  const shows = await searchShows(keyword);
  return shows;
});

export const fetchShowDetails = createAsyncThunk('shows/fetchShowDetails', async (showId: string) => {
  const show = await fetchShowDetailsApi(showId);
  return show;
});

export const fetchCastDetails = createAsyncThunk('shows/fetchCastDetails', async (showId: string) => {
  const cast = await fetchShowCastApi(showId);
  return cast;
});
