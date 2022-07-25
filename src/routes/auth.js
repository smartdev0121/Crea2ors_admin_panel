import HomePage from "../pages/Home";
import Category from "../pages/Category";
import Users from "../pages/Users";

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
];

export default routes;
