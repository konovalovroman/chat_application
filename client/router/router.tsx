import { RouteObject } from "react-router";
import SignUpPage from "../pages/signUpPage";
import SignInPage from "../pages/signInPage";
import { createBrowserRouter } from "react-router-dom";
import MainPage from "../pages/mainPage";

const routes: RouteObject[] = [
    {
        path: '/',
        element: <MainPage />,
    },
    {
        path: '/signup',
        element: <SignUpPage />,
    },
    {
        path: '/signin',
        element: <SignInPage />,
    },
];

const router = createBrowserRouter(routes);

export default router;
