import HomePage from "../pages/Home";
import Category from "../pages/Category";
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
];

export default routes;
