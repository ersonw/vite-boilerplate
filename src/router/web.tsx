import My from "@/views/My";
import Store from "@/views/Store";
import WebHome from "@/views/Home/web.tsx";

const routes = [
    {
        path: "/",
        // element: () => import('@/layouts/layout'),
        children: [
            {
                path: "/",
                element: <WebHome />
            },
            {
                path: "/my",
                element: <My />
            },
            {
                path: "/:id",
                element: <Store />
            }
        ]
    }
];

export default routes;
