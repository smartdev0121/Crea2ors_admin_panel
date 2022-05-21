import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";

const routes = [
  {
    path: "/sign-in",
    component: SignIn,
    exact: true,
  },
  {
    path: "/sign-up",
    component: SignUp,
    exact: true,
  },
];

export default routes;
