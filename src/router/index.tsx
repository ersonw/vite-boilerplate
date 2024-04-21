import Home from "@/views/Home";
import My from "@/views/My";
import Store from "@/views/Store";

const routes = [
    {
        path: "/",
        // element: () => import('@/layouts/layout'),
        children: [
            {
                path: "/",
                element: <Home />
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
