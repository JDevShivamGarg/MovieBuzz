import React from 'react';
import { Link } from 'react-router-dom';
import { Show } from '../models/Show';
import { FC } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { updateShowId } from '../slice/showSlice'
import AvatarGroup from './AvatarGroup';

type ShowProps = {
  show: Show;
  updateShowId: (id: string) => void;
};

const ShowCard: FC<ShowProps> = ({ show, updateShowId }) => {
  const imagePlaceholder = "https://incakoala.github.io/top9movie/film-poster-placeholder.png";

  const handleViewDetails = () => {
    if (show.id) {
      updateShowId("" + show.id);
    }
  };

  const avatars = [
    "https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    "https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",

  ];

  return (
    <div className="max-w-xs rounded-md shadow-md p-2 m-1">
      <img
        src={show.image?.medium || imagePlaceholder}
        alt={show.name}
        className="object-cover object-center w-full rounded-t-md h-72"
      />
      <div className="flex flex-col justify-between p-6 space-y-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-semibold tracking-wide">{show.name}</h2>
          <p dangerouslySetInnerHTML={{ __html: show.summary || "" }} />
        </div>
        <AvatarGroup avatars={avatars} />
        <Link
          to={`/show/${show.id}`}
          className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md bg-blue-500 text-white hover:bg-blue-600"
          onClick={handleViewDetails}
        >
          View Details
        </Link>
      </div>
    </div>
  );
};


const mapDispatchToProps = {
  updateShowId,
};


const connector = connect(null, mapDispatchToProps);

type ReduxProps = ConnectedProps<typeof connector>;


export default connector(ShowCard);
