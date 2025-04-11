import { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBar from "../Components/SearchBar";
import ShowCard from "../Components/ShowCard";
import { showQuerySelector, showSelector, showsLoadingSelector } from "../selectors/Show";
import { showQueryChanged } from "../slice/showSlice";
import LoadingSpinner from "../Components/LoadingSpinner";


const ShowListPage: FC = () => {
  const dispatch = useDispatch();
  
  const query = useSelector(showQuerySelector);
  const shows = useSelector(showSelector);
  const loading = useSelector(showsLoadingSelector);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(showQueryChanged(event.target.value));
  };

  return (
    <div>
      <div className="flex flex-col">
        <SearchBar value={query} onChange={handleQueryChange} />
        {loading && <LoadingSpinner />}
      </div>
      <div className="flex flex-wrap justify-center">
        {shows.map((show:any) => (
          <ShowCard key={show.id} show={show} />
        ))}
      </div>
    </div>
  );
};

export default ShowListPage;
