import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import eruda from 'eruda'
import WebApp from '@twa-dev/sdk'
import Pulldown from '@better-scroll/pull-down';
import Pullup from '@better-scroll/pull-up';
import BScroll from "@better-scroll/core";


BScroll.use(Pulldown)
BScroll.use(Pullup)
// console.log(navigator);
if (import.meta.env.DEV) {
    eruda.init()
}
WebApp.enableClosingConfirmation();
WebApp.closeScanQrPopup();
// if(WebApp.platform === "unknown"){
//     ReactDOM.createRoot(document.getElementById('root')!).render(
//         <React.StrictMode>
//             <BrowserRouter>
//                 <Web />
//             </BrowserRouter>
//         </React.StrictMode>,
//     )
// }else{
    ReactDOM.createRoot(document.getElementById('root')!).render(
        <React.StrictMode>
            <App />
        </React.StrictMode>,
    )
    // ReactDOM.createRoot(document.getElementById('root')!).render(
    //     <App />,
    // )
// }



