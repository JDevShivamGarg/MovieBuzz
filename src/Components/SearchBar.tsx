import { FC, InputHTMLAttributes } from "react";
import { BsSearch } from "react-icons/bs";
type SearchProps= InputHTMLAttributes<HTMLInputElement>
const SearchBar:FC<SearchProps>= (props)=> {
  return (
    <div className="relative">
      <input {...props} className="px-2 py-1 w-full rounded-full border border-black" type="text" placeholder="Search" />
      <BsSearch className="absolute right-4 top-1/2 -translate-y-1/2" />
    </div>
  );
}

export default SearchBar;
