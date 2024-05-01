import {useCallback, useEffect} from "react";
import WebApp from "@twa-dev/sdk";
import TWASearchInput from "@/components/TWASearchInput";
import { Link, useFetcher} from "react-router-dom";
import styles from "./index.module.less";
import { Button } from "@mui/material";
import {MainButton} from "@twa-dev/sdk/react";
import useUserContext from "@/components/Hook/useUserContext.ts";


const Home = ()=>{
    const { user } = useUserContext();
    const fetcher = useFetcher({key:'home'});
    // const loaderData = useLoaderData();
    const cb = useCallback(()=>{
        WebApp.MainButton.show();
        // WebApp.requestWriteAccess((access)=>{
        //     console.log(access)
        // });
        // WebApp.requestContact((access)=>{
        //     console.log(access)
        // });
        // WebApp.sendData("asdasd");
    },[]);
    const cbm = useCallback(()=>{
        WebApp.MainButton.hide();
    },[]);
    useEffect(() => {
        if (fetcher.state === "idle" && !fetcher.data) {
            fetcher.load("/api/index");
        }
    }, [fetcher]);
    const onSubmit = ()=>{
        fetcher.submit(WebApp.initData, {method:'post',action:'/api/initData',encType:'multipart/form-data'});
    }
    console.log(user);
    return (
        <div className={styles.container}>
            <MainButton onClick={cbm} text={""} disabled={false}/>
            <TWASearchInput/>
            <Button variant={'contained'} onClick={cb}>TEST</Button>
            <Link to={"/s?q=21312321"}>TEST LINK</Link>
            <button onClick={onSubmit}>提交数据</button>
            <div>{JSON.stringify(fetcher.data)}</div>
        </div>
    )
}
export default Home;