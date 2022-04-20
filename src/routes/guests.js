import SignIn from "../pages/SignIn";
import SignUp from "../pages/SignUp";
import PasswordReset from "../pages/PasswordReset";
import HomePage from "../pages/Home";
import ResetComponent from "../pages/PasswordReset/ResetComponent";

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
  {
    path: "/password-reset",
    component: PasswordReset,
    exact: true,
  },
  {
    path: "/reset-password/:token/:email",
    component: ResetComponent,
    exact: true,
  },
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
];

export default routes;
