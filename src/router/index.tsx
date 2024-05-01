import My from "@/views/My";
import Search from "@/views/Search";
import Store from "@/views/Store";
import Root from "@/views/Root";
import Home from "@/views/Home";
import {json, RouteObject} from "react-router-dom";
import ErrorBoundary from "@/views/ErrorBoundary";
import {formDataTostring, requestT} from "@/utils/common.ts";
// eslint-disable-next-line react-refresh/only-export-components
const Request = requestT(100);
const routes: RouteObject[] = [
    {
        id: "parent",
        path: "/",
        element: <Root />,
        errorElement: <ErrorBoundary />,
        // loader: async({params,request, context })=>{
        //     console.log(params,request,context)
        //     return {useId:'ACTION'}
        // },
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "api/:fun/:action?",
                action: async ({params,request,context}) => {
                    console.log(params,request,context);
                    const formData = await request.formData();
                    const data = formDataTostring(formData);
                    const {method,url,} = request;
                   return await new Promise((resolve) => {
                       Request<never>({url, method, data,}).then(resolve).catch(()=>{
                            resolve(null);
                        });
                    });
                },
                loader: async({params,request, context })=>{
                    // const formData = await request.formData();
                    // const data = formDataTostring(formData);
                    // const {method,url,} = request;
                    // return await new Promise((resolve) => {
                    //     Request({url, method, data,}).then(resolve).catch(()=>{
                    //         resolve(undefined);
                    //     });
                    // });
                    return json(params);
                },
            },
            {
                path: "my",
                element: <My />
            },
            {
                path: "s",
                element: <Search />
            },
            {
                path: "s/:id",
                element: <Search />
            },
            {
                path: ":id",
                element: <Store />
            }
        ]
    }
];

export default routes;
