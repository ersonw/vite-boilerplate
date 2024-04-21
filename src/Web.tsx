import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {useLocation, useNavigate, useRoutes, Location } from "react-router-dom";
import routes from "@/router/web.tsx";
import http from "@/utils/http";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let intv:any;
function unInitData(){
    if (intv){
        clearTimeout(intv);
    }
}
function initData(cb: { (): void; (): void; }) {
    unInitData();
    intv = setTimeout(() => {
        http.post({
            url: '/api/initData',
            data: {}
        }).then(()=>{
            cb();
        });
    }, 50);
}

function Web() {
    const [ros, setRos] = useState<Location[]>([]);
    const [ro, setRo] = useState<Location>();
    const navigate = useNavigate();
    const GetRoutes = () => useRoutes(routes);
    const location  = useLocation();

    // console.log(WebApp.headerColor);
    useEffect(() => {
        // initData(initCallback);
        // return ()=>{
        //     unInitData();
        // }
    },[]);
    const isDiifine = (oldLocation: Location | undefined, newLocation: Location | undefined) => {
        if (!oldLocation ||!newLocation) {
            return true;
        }
        return oldLocation.pathname!== newLocation.pathname || oldLocation.search!== newLocation.search || oldLocation.hash!== newLocation.hash;
    }
    useEffect(() => {
        if (isDiifine(ro, location)){
            console.log(ro);
            if (ros.length > 0){
                const lo = ros[ros.length - 1];
                if (isDiifine(lo,location)){
                    setRos([...ros, location]);
                }
            }else{
                setRos([location]);
            }
            setRo(location);
        }
    }, [location, ros, ro]);
    return (
        <div className={"App"}>
            <GetRoutes></GetRoutes>
        </div>
    )
}

export default Web
