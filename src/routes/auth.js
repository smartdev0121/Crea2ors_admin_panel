import HomePage from "../pages/Home";
import Category from "../pages/Category";
import Users from "../pages/Users";
import Reports from "../pages/Reports";

const routes = [
  {
    path: "/admin/homepage_construct",
    component: HomePage,
    exact: true,
  },
  {
    path: "/admin/categories",
    component: Category,
    exact: true,
  },
  {
    path: "/admin/users",
    component: Users,
    exact: true,
  },
  {
    path: "/admin/reports",
    component: Reports,
    exact: true,
  },
];

export default routes;
