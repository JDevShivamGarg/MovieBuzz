import { produce } from "immer";
import { AnyAction } from "redux";
import { Cast, Show } from "../models/Show";
import { FETCH_CAST_DETAILS, SHOW_DETAILS_FAILURE, SHOW_DETAILS_SUCCESS, SHOW_ID_UPDATE, SHOW_QUERY_CHANGED, SHOWS_LOADED, UPDATE_CAST_DETAILS } from "../actions/Show";
import { normalize, schema } from "normalizr";

export type State ={
    shows:{[showId:number]:Show },
    query:string
    showDetails: Show | null,
    error:string | null,
    showId:string | null,
    query_shows:{[query:string]:number[]},
    loading:boolean,
    show_loading:{[showId:string] : boolean},
    castDetails: Cast[];
}
export const initialState:State = {
    shows:{},
    query:"",
    showDetails: null,
    error:null,
    showId: null,
    query_shows:{},
    loading: false,
    show_loading:{},
    castDetails: []
}
function ShowReducer(state = initialState, action:AnyAction): State {
    switch(action.type){
        case SHOWS_LOADED:
            return produce(state, (draft) => {
                const shows = action.payload; 
                if (!shows || !Array.isArray(shows) || shows.length === 0) {
                 
                  return state; 
                }
        
                const showSchema = new schema.Entity('shows');
                const normalizedData = normalize(shows, [showSchema]);
                draft.loading = false;
                draft.query_shows[draft.query] = normalizedData.result
                draft.shows = {...draft.shows,...normalizedData.entities.shows}
              });
        case SHOW_QUERY_CHANGED:
            return produce(state, draft => {
                draft.query = action.payload;
                draft.loading = true
            });
        case SHOW_DETAILS_SUCCESS:
            return produce(state, (draft) => {
                draft.showDetails = action.payload;
                draft.error = null;
            });
        case SHOW_DETAILS_FAILURE:
            return produce(state, (draft) => {
                draft.showDetails = null;
                draft.error = action.payload;
            });
        case SHOW_ID_UPDATE:
            return produce(state, (draft) => {
                draft.showId = action.payload;  
            });
              
        case UPDATE_CAST_DETAILS:
            return produce(state, (draft) => {
                draft.castDetails = action.payload;
            });
        
        default:
            return state;
    }   
}
export default ShowReducer;