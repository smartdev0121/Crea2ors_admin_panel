import CreateCollectionPage from "../pages/CreateCollection/CreateCollectionPage";
import CreateAssetPage from "../pages/CreateAsset/CreateAssetPage";
import MyCollectionsPage from "../pages/MyCollections/MyCollectionsPage";
import AllCollectionsPage from "../pages/AllCollections/AllCollectionsPage";
import AllAssetsPage from "../pages/AllAssets/AllAssetsPage";
import CollectionAssetsPage from "../pages/CollectionAssets/CollectionAssetsPage";
import SingleAssetPage from "../pages/SingleAsset/SingleAssetPage";
import BatchTransferPage from "../pages/BatchTransfer/BatchTransferPage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import SellAssetPage from "../pages/SellAsset/SellAssetPage";
import EditAssetPage from "../pages/EditAsset/EditAssetPage";
import EditCollectionPage from "../pages/EditCollection/EditCollectionPage";
import AssetsPage from "../pages/Assets/AssetsPage";
import AccountInfoPage from "../pages/AccountInfo/AccountInfoPage";
import EditAccountPage from "../pages/EditAccount/EditAccountPage";
import CollectionView from "../pages/CollectionView";
import CreateNFTPage from "../pages/CreateNFTPage";
import ConnectWallet from "../pages/ConnectWallet";
import HomePage from "../pages/Home";
import NFTView from "../pages/NFTView";

const routes = [
  {
    path: "/",
    component: HomePage,
    exact: true,
  },
  {
    path: "/explore-collections",
    component: AllCollectionsPage,
    exact: true,
  },
  {
    path: "/explore-assets",
    component: AllAssetsPage,
    exact: true,
  },
  {
    path: "/collection-view",
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
    path: "/collections",
    component: MyCollectionsPage,
    exact: true,
  },
  {
    path: "/collection/:chainId/:address",
    component: CollectionAssetsPage,
  },
  {
    path: "/collection/:chainId/:address/edit",
    component: EditCollectionPage,
  },
  {
    path: "/add-asset/:chainId/:address",
    component: CreateAssetPage,
  },
  {
    path: "/assets",
    component: AssetsPage,
  },
  {
    path: "/asset/:chainId/:address/:tokenId",
    component: SingleAssetPage,
  },
  {
    path: "/asset/:chainId/:address/:tokenId/edit",
    component: EditAssetPage,
  },
  {
    path: "/asset/:chainId/:address/:tokenId/sell",
    component: SellAssetPage,
  },
  {
    path: "/account",
    component: AccountInfoPage,
  },
  {
    path: "/account/settings",
    component: EditAccountPage,
  },
  {
    path: "/account/:address",
    component: AccountInfoPage,
  },
  {
    path: "/create-collection",
    component: CreateCollectionPage,
  },
  {
    path: "/batch-transfer",
    component: BatchTransferPage,
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
];

export default routes;
