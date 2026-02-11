import App from "./App";
import Admin from "./components/admin/Admin";

const routes = [
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/admin",
        element: <Admin />,
    },
];

export default routes;
