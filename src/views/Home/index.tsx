import {Link} from "react-router-dom";
import WebApp from "@twa-dev/sdk";
import {useEffect} from "react";
import http from "@/utils/http";
import styles from "./index.module.less";
import {InitialsAvatar} from "@twa-dev/mark42";

const Home = () => {

    useEffect(() => {
    }, []);
    const test = () => {
        // http.post({
        //     url: '/api/test',
        //     data: {},
        //     duplicateRequestValidation: true,
        // }).then((res: any) => {
        //     console.log(res);
        // }).catch((e) => {
        //     console.log(e);
        // });
        WebApp.switchInlineQuery("123",["users","bots"]);
    }
    return (
        <div className={styles.container}>
            <h2>首页</h2>
            <div>user:{WebApp.initDataUnsafe.user?.username}</div>
            <div>receiver:{WebApp.initDataUnsafe.receiver?.username}</div>
            <div>chat_type:{WebApp.initDataUnsafe.chat_type}</div>
            <div>start_param:{WebApp.initDataUnsafe.start_param}</div>
            <Link to={"/my"}>我的</Link>
            <button onClick={test}>Test server</button>
            <Link to={"/wlerson?q=12321"}>店铺</Link>
            <InitialsAvatar
                // userId={WebApp.initDataUnsafe.user?.id ?? 0}
                // userName={WebApp.initDataUnsafe.user?.username ?? ""}
                theme="apple"
                className="MyAvatar"
                style={{ marginRight: 10 }}
                entityId={WebApp.initDataUnsafe.user?.id ?? 0}
                entityName={WebApp.initDataUnsafe.user?.username ?? ""}
            />
        </div>)
}
export default Home;
