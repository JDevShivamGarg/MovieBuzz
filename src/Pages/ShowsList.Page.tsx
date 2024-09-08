import { FC } from "react";
import SearchBar from "../Components/SearchBar";
import { connect, ConnectedProps } from "react-redux"
import ShowCard from "../Components/ShowCard";
import { Show } from "../models/Show";
import { ShowLoadedActions, ShowQueryChangeAction } from "../actions/Show";
import { State } from "../store";
import { showQuerySelector, showSelector, showsLoadingSelector } from "../selectors/Show";
import LoadingSpinner from "../Components/LoadingSpinner";

type ShowDetailPageProps = ReduxProps;
const ShowListPage:FC<ShowDetailPageProps>=({shows,query,showQueryChange,loading})=> {
  return (
    <div className="mt-2">
      <div className="flex flex-col">
      <SearchBar value={query} onChange={(event)=>{showQueryChange(event.target.value)}} />
      {loading && <LoadingSpinner/>}
      </div>
      <div className="flex flex-wrap justify-center">
        {shows.map((s)=>(<ShowCard key = {s.id} show={s}></ShowCard>))}
      </div>
    </div>
  );
}
const mapStateToProps = (state:State) => {
  return{query: showQuerySelector(state),shows: showSelector(state),loading:showsLoadingSelector(state)}
}
const mapDispatchToProps = {
  showLoaded : ShowLoadedActions,
  showQueryChange : ShowQueryChangeAction
}

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>

export default connector(ShowListPage);
