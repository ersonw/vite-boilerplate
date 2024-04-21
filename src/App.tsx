import {useCallback, useEffect, useState} from 'react'
import './App.css'
import {useLocation, useNavigate, useRoutes, Location } from "react-router-dom";
import routes from "@/router";
import http from "@/utils/http";
import {BackButton} from "@twa-dev/sdk/react";
import WebApp from "@twa-dev/sdk";
import {
    TonConnectButton,
    TonConnectUIProvider,
    useTonAddress,
    useTonConnectUI,
    useTonWallet
} from "@tonconnect/ui-react";
import {SendTransactionRequest} from "@tonconnect/sdk";
import TonWeb from "tonweb";
const tonWeb = new TonWeb();


// eslint-disable-next-line @typescript-eslint/no-explicit-any
let intv:any;
function unInitData(){
    if (intv){
        clearTimeout(intv);
    }
}
function initData(cb: (data: any)=>void) {
    unInitData();
    intv = setTimeout(() => {
        http.post({
            url: '/api/initData',
            data: WebApp.initData
        }).then((e)=>{
            // console.log(e);
            cb(e);
        });
    }, 50);
}
export const Address = () => {
    const userFriendlyAddress = useTonAddress();
    const rawAddress = useTonAddress(false);
    const tonWallet = useTonWallet();
    console.log(tonWallet);
    return (
        userFriendlyAddress && (
            <div>
                <span>User-friendly address: {userFriendlyAddress}</span>
                <span>Raw address: {rawAddress}</span>
            </div>
        )
    );
};


export const Settings =   () => {
    const [tonConnectUI, setOptions] = useTonConnectUI();
    setOptions({});
    useEffect(() => {
        tonConnectUI.onStatusChange((wallet)=>{
            console.log(wallet);
        });
    }, [tonConnectUI]);
   const wallet = useTonWallet();
   console.log(wallet);
    const sendTransaction = useCallback(async () => {
        const cell = new tonWeb.boc.Cell();
        cell.bits.writeUint(0, 32);
        cell.bits.writeString("Hello, world!");
        const payload = tonWeb.utils.bytesToBase64(await cell.toBoc());
        // console.log(payload);
        const transaction: SendTransactionRequest = {
            validUntil: Math.floor(Date.now() / 1000) + 360,
            messages: [
                {
                    address: "UQDcTiZxm8-FrBfw1wZFZajb6nSVDzGBQVR0_89oj2YJwJH0", // 目的地址
                    // address: "UQCFDfpKXEc2uIg7sbgE8d8MCO6c7r1Phzo9S0AAqblkHf4g", // 目的地址
                    amount: tonWeb.utils.toNano("0.01").toString(), //以nanotons计的Toncoin
                    payload: payload,
                }
            ]
        }
        await tonConnectUI.sendTransaction(transaction)
    },[tonConnectUI]);


    return (
        <div>
            <button onClick={sendTransaction}>
                Send transaction
            </button>
        </div>
    );
};
function App() {
    const [ros, setRos] = useState<Location[]>([]);
    const [ro, setRo] = useState<Location>();
    const navigate = useNavigate();
    const GetRoutes = () => useRoutes(routes);
    const location  = useLocation();

    useEffect(()=>{
        WebApp.onEvent('settingsButtonClicked',()=>{
            WebApp.expand();
            console.log('settingsButtonClicked')
        });
    },[]);
    const initCallback = useCallback((data: any)=>{
        console.log(data);
        if (WebApp.initDataUnsafe.start_param){
            let path_ = WebApp.initDataUnsafe.start_param;
            if (path_.at(0) === '@'){
                path_ = path_.substring(1);
            }
            navigate("/"+path_);
        }
    },[navigate]);
    useEffect(() => {
        initData(initCallback);
        return ()=>{
            unInitData();
        }
    },[initCallback]);
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
    useEffect(() => {
        if (ros.length > 1){
            WebApp.BackButton.show();
        }else if(location.pathname === '/'){
            WebApp.BackButton.hide();
        }else{
            WebApp.BackButton.show();
        }
    }, [ros,location]);

    const backCallback = useCallback(() => {
        if (ros.length > 1){
            const lo = ros[ros.length - 2];
            setRos(ros.slice(0,ros.length - 2));
            navigate({
                pathname: lo.pathname,
                search: lo.search,
                hash: lo.hash
            });
        }else{
            if (location.pathname !== "/"){
                navigate({
                    pathname: "/"
                });
            }else{
                // window.history.go(-1);
            }
        }
    },[ros,navigate,location]);
    return (
        <TonConnectUIProvider
            manifestUrl={import.meta.env.VITE_APP_TON_CONNECT}
            actionsConfiguration={{
                twaReturnUrl: import.meta.env.TWA_RETURN_URL
            }}
        >
            <BackButton onClick={backCallback} />
            {/*<TonConnectButton />*/}
            <GetRoutes></GetRoutes>
            {/*<Settings />*/}
            {/*<Address />*/}
            {/*<MainButton onClick={mainCallback} text={"立即支付"} progress={true} />*/}
        </TonConnectUIProvider>
    )
}

export default App
