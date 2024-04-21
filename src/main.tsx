import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import eruda from 'eruda'
import WebApp from '@twa-dev/sdk'
import {BrowserRouter} from "react-router-dom";
import Pulldown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import BScroll from "@better-scroll/core";
import Web from "@/Web.tsx";


BScroll.use(Pulldown)
BScroll.use(Pullup)
WebApp.ready();
WebApp.enableClosingConfirmation();
if (import.meta.env.DEV) {
    eruda.init()
}
// if (import.meta.env.DEV) {
//     eruda.init()
//     ReactDOM.createRoot(document.getElementById('root')!).render(
//         <React.StrictMode>
//             <BrowserRouter>
//                 <App/>
//             </BrowserRouter>
//         </React.StrictMode>,
//     )
// } else {
    if (WebApp.platform == "unknown") { /* empty */
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <BrowserRouter>
                    <Web/>
                </BrowserRouter>
            </React.StrictMode>,
        )
    } else {
        ReactDOM.createRoot(document.getElementById('root')!).render(
            <React.StrictMode>
                <BrowserRouter>
                    <App/>
                </BrowserRouter>
            </React.StrictMode>,
        )
    }
// }


