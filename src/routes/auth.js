import CreateCollectionPage from "../pages/CreateCollection/CreateCollectionPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import CollectionView from "../pages/CollectionView";
import CreateNFTPage from "../pages/CreateNFTPage";
import ConnectWallet from "../pages/ConnectWallet";
import HomePage from "../pages/Home";
import NFTView from "../pages/NFTView";
import MyProfile from "../pages/MyProfile";
import EditProfile from "../pages/EditProfile";
import OtherProfile from "../pages/OtherProfile";

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/edit-profile",
    component: EditProfile,
    exact: true,
  },
  {
    path: "/explore-collections",
    exact: true,
  },
  {
    path: "/my-profile",
    component: MyProfile,
    exact: true,
  },
  {
    path: "/explore-assets",
    exact: true,
  },
  {
    path: "/collection-view/:contractAddress",
    component: CollectionView,
    exact: true,
  },
  {
    path: "/create-collection",
    component: CreateCollectionPage,
    exact: true,
  },
  {
    path: "/create-nft",
    component: CreateNFTPage,
    exact: true,
  },
  {
    path: "/nft-view",
    component: NFTView,
    exact: true,
  },
  {
    path: "/create-collection",
    component: CreateCollectionPage,
  },
  {
    path: "/not-found",
    component: NotFoundPage,
  },
  {
    path: "/connect-wallet",
    component: ConnectWallet,
    exact: true,
  },
  {
    path: "/custom/:customUrl",
    component: OtherProfile,
    exact: true,
  },
];

export default routes;
