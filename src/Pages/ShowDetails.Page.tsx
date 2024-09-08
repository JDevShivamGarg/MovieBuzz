import { FC, useEffect } from "react";
import CastCard from "../Components/CastCard";
import GenrePill from "../Components/GenrePill";
import withRouter, { WithRouterProps } from "../hocs/withRouter";
import { IoArrowBack } from "react-icons/io5"
import { Link } from "react-router-dom";
import { State } from "../store";
import { fetchCastDetails, fetchShowDetails } from "../actions/Show";
import { connect, ConnectedProps } from "react-redux";

type ShowDetailPageProps = WithRouterProps & ReduxProps

const ShowDetailPage: FC<ShowDetailPageProps> = ({ params, fetchShowDetails, showDetails, error, fetchCastDetails, castDetails }) => {
  const showId = params.showId;

  useEffect(() => {

    fetchShowDetails(showId);
    fetchCastDetails(showId);
  }, [showId, fetchShowDetails, fetchCastDetails]);


  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!showDetails) {
    return <div>Loading...</div>;
  }
  const imagePlaceholder = "https://incakoala.github.io/top9movie/film-poster-placeholder.png"
  return (
    <div className="mt-2">
      <Link className="flex items-center" to='/'><IoArrowBack />Back</Link>
      <h2 className="text-4xl font-semibold tracking-wide">{showDetails.name}</h2>
      <div className="flex space-x-3 my-2 bg-gray-300 p-2 rounded-sm">
        {showDetails.genres.map((genre: string, index: number) => (
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
          <p dangerouslySetInnerHTML={{ __html: showDetails.summary || "" }}>
          </p>
          <p className="mt-2 text-lg font-bold border border-gray-700 rounded-md px-2 py-1 max-w-max">
            Rating: <span className="text-gray-700">{showDetails.rating.average}/10</span>
          </p>
        </div>
      </div>

      <div className="mt-2">
        <h4 className="text-2xl font-semibold tracking-wide">Cast</h4>
        <div className="flex flex-wrap ">
          {castDetails.map((castMember) => (
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


const mapStateToProps = (state: State) => ({
  showDetails: state.shows.showDetails,
  error: state.shows.error,
  castDetails: state.shows.castDetails
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchShowDetails: (showId: string) => {
    dispatch(fetchShowDetails(showId));
  },
  fetchCastDetails: (showId: string) => {
    dispatch(fetchCastDetails(showId));
  }
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>

export default connector(withRouter(ShowDetailPage));
