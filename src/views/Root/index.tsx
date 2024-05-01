import {useCallback, useEffect, useState} from "react";
import {
    Location,
    Outlet,
    useBlocker,
    useLocation,
    useNavigate,
} from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import appbar from "@/router/appbar.tsx";
import { createTheme, ThemeProvider} from "@mui/material";
import {BackButton} from "@twa-dev/sdk/react";
import AppBar from "@/components/AppBar";
import {requestT} from "@/utils/common.ts";
import {User} from "@/data/types.ts";
import {UserContextType} from "@/components/Hook/useUserContext.ts";

const router: Location[]=[];
const Request = requestT();
const Root = () => {
    const [user,setUser] = useState<User>();
    const location = useLocation();
    const navigate = useNavigate();
    const [colorScheme, setColorScheme] = useState(WebApp.colorScheme);
    // const Element = useOutlet({user});
    useEffect(()=>{
        Request<User>({method:'post', url:'/api/initData', data: WebApp.initData})
            .then(setUser).catch(console.log);
        WebApp.expand();
        const cb = ()=>{
            console.log("settingsButtonClicked");
        }
        WebApp.SettingsButton.onClick(cb);
        WebApp.SettingsButton.show();
        const cs = ()=>{
            setColorScheme(WebApp.colorScheme);
        }
        WebApp.onEvent("themeChanged",cs);
        return ()=>{
            WebApp.offEvent("themeChanged",cs);
            WebApp.SettingsButton.offClick(cb);
            WebApp.SettingsButton.hide();
            router.splice(-1);
        }
    },[]);
    const isDiifine = (src: Location<unknown>, dst: Location<unknown>) => {
        if (src && dst){
            if (src.pathname===dst.pathname&&src.search===dst.search&&src.hash===dst.hash){
                return false;
            }
        }
        return true;
    }
    const blocker = useBlocker(({ currentLocation, nextLocation }) => isDiifine(currentLocation, nextLocation));
    useEffect(() => {
        //寻找当前路径是否属于导航栏
        const current = appbar.findIndex((v)=>v.path===location.pathname);
        if (blocker.state === "blocked"){
            const located = blocker.location;
            //寻找跳转的路径是否属于导航栏
            const next = appbar.findIndex((v)=>v.path===located.pathname);
            if (current < 0 && next < 0){
                router.push(location);
            }
            blocker.proceed();
        }
        //非首页或者页面跳转
        if (router.length>0||current < 0){
            WebApp.BackButton.show();
        }else{
            WebApp.BackButton.hide();
        }
    }, [blocker,location]);

    const backCallback = useCallback(() => {
        const lo = router[router.length - 1];
        if (lo){
            const index = router.findIndex(v=>!isDiifine(v, lo));
            router.splice(index,1)
            navigate({pathname: lo.pathname, search: lo.search, hash: lo.hash});
        }else{
            navigate({pathname: "/"});
        }
    },[navigate]);
    const darkTheme = createTheme({
        palette: {
            mode: colorScheme,
        },
    });
    return (
        <ThemeProvider theme={darkTheme}>
            <BackButton onClick={backCallback}/>
            {/*{Element}*/}
            {/*<Outlet context={{user}} />*/}
            <Outlet context={{user} satisfies UserContextType} />
            <AppBar/>
        </ThemeProvider>
    )
}
export default Root;

