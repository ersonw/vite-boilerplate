import { useLocation } from "react-router-dom";
import qs from 'query-string';

const Search = () => {
   const { search } = useLocation();
   const q = qs.parse(search)["q"];
   return (
    <div>{q}</div>
   )
};

export default Search;