import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LandingPage from "./LandingPage";
import Confetti from "./confetti";

const routes: RouteObject[] = [
    {
        path: "/",
        element: <LandingPage />,
    },
    {
        path: "/confetti",
        element: <Confetti />,
    },
];

const router = createBrowserRouter(routes);

export default router;