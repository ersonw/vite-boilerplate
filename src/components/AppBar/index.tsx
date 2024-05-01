import styles from "./index.module.less";
import {Link, useLocation} from "react-router-dom";
import barRouter from "@/router/appbar.tsx";
import {useEffect, useState} from "react";
import appbar from "@/router/appbar.tsx";
import {SwitchTransition, CSSTransition} from "react-transition-group";

const AppBar = () => {

    const [show, setShow] = useState(false);
    const location  = useLocation();
    const [active, setActive] = useState("");
    useEffect(() => {
        const index = appbar.findIndex((v)=>v.path===location.pathname);
        if (index >= 0){
            setActive(location.pathname);
            setShow(true);
        }
        return ()=>{
            setActive("");
            setShow(false);
        }
    }, [location]);
    return (
        <>
            {show && (
                <div className={styles.container}>
                    <div className={styles.box}>
                        {barRouter.map(({path, icon: Icon}, index) => {
                            return (
                                <SwitchTransition key={index} mode="in-out">
                                    <CSSTransition key={`${index}-2`} timeout={300} classNames="enter" nodeRef={null}>
                                        <Link to={path}
                                              className={[styles.item, active === path ? styles.act : ""].join(" ")}>
                                            <Icon className={styles.icon}/>
                                        </Link>
                                    </CSSTransition>
                                </SwitchTransition>
                            )
                        })}
                    </div>
                </div>
            )}
        </>
    )
}
export default AppBar;