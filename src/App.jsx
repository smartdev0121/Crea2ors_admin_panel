import React, { useEffect, useState } from 'react'
import { Switch, Route } from 'react-router-dom'

import { NotificationContainer } from 'react-notifications'

import { getUserRole } from 'src/utils/permission'

import './App.css'
import './styles/styles.css'

import MainLayout from './layout/MainLayout'

import HomePage from './pages/Home'
import CreateCollectionPage from './pages/CreateCollection/CreateCollectionPage'
import CreateAssetPage from './pages/CreateAsset/CreateAssetPage'

import MyCollectionsPage from './pages/MyCollections/MyCollectionsPage'

import AllCollectionsPage from './pages/AllCollections/AllCollectionsPage'
import AllAssetsPage from './pages/AllAssets/AllAssetsPage'

import CollectionAssetsPage from './pages/CollectionAssets/CollectionAssetsPage'
import SingleAssetPage from './pages/SingleAsset/SingleAssetPage'
import BatchTransferPage from './pages/BatchTransfer/BatchTransferPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import SellAssetPage from './pages/SellAsset/SellAssetPage'
import EditAssetPage from './pages/EditAsset/EditAssetPage'
import EditCollectionPage from './pages/EditCollection/EditCollectionPage'
import AssetsPage from './pages/Assets/AssetsPage'
import AccountInfoPage from './pages/AccountInfo/AccountInfoPage'
import EditAccountPage from './pages/EditAccount/EditAccountPage'

const App = () => {
  const [whitelisted, setWhitelisted] = useState(false)

  useEffect(() => {
    ;(async () => {
      const role = await getUserRole()
      setWhitelisted(role)
    })()
  }, [])

  return (
    <MainLayout>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/explore-collections' component={AllCollectionsPage} />
        <Route path='/explore-assets' component={AllAssetsPage} />

        <Route path='/collections' component={MyCollectionsPage} />
        <Route
          exact
          path='/collection/:chainId/:address'
          component={CollectionAssetsPage}
        />
        <Route
          path='/collection/:chainId/:address/edit'
          component={EditCollectionPage}
        />
        <Route
          path='/add-asset/:chainId/:address'
          component={CreateAssetPage}
        />

        <Route exact path='/assets' component={AssetsPage} />
        <Route
          exact
          path='/asset/:chainId/:address/:tokenId'
          component={SingleAssetPage}
        />
        <Route
          path='/asset/:chainId/:address/:tokenId/edit'
          component={EditAssetPage}
        />
        <Route
          path='/asset/:chainId/:address/:tokenId/sell'
          component={SellAssetPage}
        />

        <Route exact path='/account' component={AccountInfoPage} />
        <Route path='/account/settings' component={EditAccountPage} />
        <Route path='/account/:address' component={AccountInfoPage} />

        {whitelisted && (
          <>
            <Route path='/create-collection' component={CreateCollectionPage} />
            <Route path='/batch-transfer' component={BatchTransferPage} />
          </>
        )}
        <Route path='/' component={NotFoundPage} />
      </Switch>

      <NotificationContainer />
    </MainLayout>
  )
}

export default App
