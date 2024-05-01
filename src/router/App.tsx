// import {useCallback, useEffect, useState} from "react";
// import {Location, useLocation, useNavigate} from "react-router-dom";
// import WebApp from "@twa-dev/sdk";
// import appbar from "@/router/appbar.tsx";
// import {createTheme, ThemeProvider} from "@mui/material";
// import {BackButton} from "@twa-dev/sdk/react";
// import AppBar from "@/views/AppBar";
// import http from "@/utils/http";
//
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// let intv:any;
// function unInitData(){
//     if (intv){
//         clearTimeout(intv);
//     }
// }
// // eslint-disable-next-line @typescript-eslint/no-explicit-any
// function initData(cb: (data: any)=>void) {
//     unInitData();
//     intv = setTimeout(() => {
//         http.post({
//             url: '/api/initData',
//             data: WebApp.initData
//         }).then((e)=>{
//             // console.log(e);
//             cb(e);
//         });
//     }, 50);
// }
// const AppRoot = () => {
//     const [ros, setRos] = useState<Location[]>([]);
//     const navigate = useNavigate();
//     const location  = useLocation();
//     const [colorScheme, setColorScheme] = useState<"dark"|"light">();
//
//     useEffect(()=>{
//         WebApp.expand();
//         const cb = ()=>{
//             console.log("settingsButtonClicked");
//         }
//         WebApp.SettingsButton.onClick(cb);
//         WebApp.SettingsButton.show();
//         const cs = ()=>{
//             setColorScheme(WebApp.colorScheme);
//         }
//         WebApp.onEvent("themeChanged",cs);
//         return ()=>{
//             WebApp.offEvent("themeChanged",cs);
//             WebApp.SettingsButton.offClick(cb);
//             WebApp.SettingsButton.hide();
//         }
//     },[]);
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     const initCallback = useCallback((data: any)=>{
//         console.log(data);
//         if (WebApp.initDataUnsafe.start_param){
//             // let path_ = WebApp.initDataUnsafe.start_param;
//             // if (path_.at(0) === '@'){
//             //     path_ = path_.substring(1);
//             // }
//             // navigate("/"+path_);
//         }
//     },[navigate]);
//     useEffect(() => {
//         initData(initCallback);
//         return ()=>{
//             unInitData();
//         }
//     },[initCallback]);
//     useEffect(() => {
//         const index = appbar.findIndex((v)=>v.path===location.pathname);
//         if (index < 0){
//             WebApp.BackButton.show();
//             isDiifine(ros[ros.length - 1], location) && setRos([...ros, location]);
//         }else{
//             WebApp.BackButton.hide();
//         }
//     }, [location,ros]);
//
//     const isDiifine = (oldLocation: Location | undefined, newLocation: Location | undefined) => {
//         if (!oldLocation ||!newLocation) {
//             return true;
//         }
//         return oldLocation.pathname!== newLocation.pathname || oldLocation.search!== newLocation.search || oldLocation.hash!== newLocation.hash;
//     }
//     const backCallback = useCallback(() => {
//         if (ros.length >= 2){
//             const lo = ros[ros.length - 2];
//             setRos(ros.slice(0,ros.length - 2));
//             navigate({
//                 pathname: lo.pathname,
//                 search: lo.search,
//                 hash: lo.hash
//             });
//         }else{
//             navigate({
//                 pathname: "/"
//             });
//         }
//     },[ros, navigate]);
//     const darkTheme = createTheme({
//         palette: {
//             mode: colorScheme,
//         },
//     });
//     return (
//         <ThemeProvider theme={darkTheme}>
//             <BackButton onClick={backCallback} />
//             <AppBar/>
//         </ThemeProvider >
//     )
// }
// export default AppRoot;