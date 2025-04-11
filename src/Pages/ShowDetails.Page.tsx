import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import { fetchCastDetails, fetchShowDetails } from "../thunks";
import { RootState , AppDispatch} from "../store";

const ShowDetailPage: FC = () => {
  const { showId } = useParams<{ showId: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const { showDetails, error, castDetails } = useSelector((state: RootState) => ({
    showDetails: state.shows.showDetails,
    error: state.shows.error,
    castDetails: state.shows.castDetails,
  }));

  useEffect(() => {
    if (showId) {
      dispatch(fetchShowDetails(showId));
      dispatch(fetchCastDetails(showId));
    }
  }, [showId, dispatch]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>Loading...</div>;
  }

  const imagePlaceholder = "https://incakoala.github.io/top9movie/film-poster-placeholder.png";

  const uniqueCastDetails = castDetails.filter((castMember, index, self) =>
    index === self.findIndex((t) => t.id === castMember.id)
  );

  return (
    <div>
      <Link className="flex items-center" to="/"><IoArrowBack />Back</Link>
      <h2 className="text-4xl font-semibold tracking-wide">{showDetails.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {showDetails.genres.map((genre, index) => (
          <GenrePill key={index} name={genre} />
        ))}
      </div>

      <div className="mt-2 flex">
        <img
          src={showDetails.image?.medium || imagePlaceholder}
          alt={showDetails.name}
          className="object-cover object-center w-full rounded-t-md h-72"
        />
        <div className="ml-2">
          <p dangerouslySetInnerHTML={{ __html: showDetails.summary || "" }}></p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{showDetails.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap">
          {uniqueCastDetails.map((castMember) => (
            <CastCard
              key={castMember.id}
              avatarLink={castMember.image?.medium || imagePlaceholder}
              name={castMember.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowDetailPage;
