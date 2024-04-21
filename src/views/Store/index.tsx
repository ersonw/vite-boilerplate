import {useLocation, useParams} from "react-router-dom";
import qs from 'query-string';
const Store = () => {
   const { id } = useParams();
   const { search } = useLocation();
   console.log(qs.parse(search)["q"]);
   // console.log(searchParams);
   return (<div>Store: {id}</div>);
}

export default Store;
