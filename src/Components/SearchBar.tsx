import React, { FC, useState, useEffect } from 'react';
import { InputHTMLAttributes } from 'react';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';
import { fetchShows } from '../thunks';
import { showQueryChanged } from '../slice/showSlice';
import { AppDispatch } from '../store';

type SearchProps = InputHTMLAttributes<HTMLInputElement>;

const SearchBar: FC<SearchProps> = (props) => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const currentQuery = useSelector((state: any) => state.shows.query); 

  useEffect(() => {
    setQuery(currentQuery);
  }, [currentQuery]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSearch = () => {
    dispatch(showQueryChanged(query));
    dispatch(fetchShows(query));
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query) {
        handleSearch();
      }
    }, 200); 

    return () => {
      clearTimeout(handler);
    };
  }, [query]);

  return (
    <div className="relative">
      <input
        {...props}
        className="px-2 py-1 w-full rounded-full border border-black"
        type="text"
        placeholder="Search"
        value={query}
        onChange={handleChange}
      />
      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
};

export default SearchBar;
