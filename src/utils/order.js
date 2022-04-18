import Web3 from "web3";
import BigNumber from "bignumber.js";

import web3Modal, {
  getCurrentNetworkId,
  getCurrentWalletAddress,
  switchNetwork,
} from "./wallet";

import showNotification from "src/config/notification";
import { marketplace_contract_address } from "src/config/contracts";
import { CONTRACT_TYPE, NULL_ADDRESS } from "src/config/global";

import { setApprovalForAll, approve } from "./contract";

const order_manager_contract_url =
  "/contracts/compiled/OrderManagerContract.abi";

let provider;

const getMarketplaceContractAddress = async () => {
  const networkId = await getCurrentNetworkId();
  return marketplace_contract_address[networkId];
};

const readContractABI = (contract_url = order_manager_contract_url) =>
  new Promise(async (resolve, reject) => {
    let ContractData;
    const contract_source = contract_url;

    fetch(contract_source)
      .then((response) => response.text())
      .then((data) => {
        ContractData = JSON.parse(data);
        return resolve(ContractData);
      })
      .catch((e) => {
        return reject();
      });
  });

export const createOrder = (
  ContractType,
  AssetAddress,
  ChainId,
  TokenId,
  Amount,
  Price,
  CurrencyTokenAddress,
  CurrencyTokenDecimals,
  Duration,
  OrderType
) =>
  new Promise(async (resolve, reject) => {
    try {
      showNotification("Waiting", "Waiting ...", "waiting");

      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: 0,
      };

      await setApprovalForAll(
        ContractAddress,
        AssetAddress,
        ChainId,
        ContractType
      );

      showNotification("Waiting", "Listing ...", "waiting");

      await contract.methods
        .createOrder([
          ContractType,
          WalletAddress,
          AssetAddress,
          TokenId,
          Amount,
          CurrencyTokenAddress === NULL_ADDRESS
            ? web3.utils.toWei(Price)
            : web3.utils
                .toBN(
                  BigNumber(Price).times(
                    BigNumber(10).pow(BigNumber(CurrencyTokenDecimals))
                  )
                )
                .toString(),
          CurrencyTokenAddress,
          0,
          Duration * 60,
          OrderType,
          WalletAddress,
          0,
        ])
        .send(tx);

      showNotification("Success", "Successfully", "success", 3);
      return resolve({ success: true });
    } catch (e) {
      showNotification("Failed", "failed", "failed", 3);
      return reject();
    }
  });

export const buyAsset = (OrderState, ChainId) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      let value = 0;

      if (OrderState.CurrencyTokenAddress === NULL_ADDRESS) {
        value =
          web3.utils.toWei(OrderState.Price.toString()) * OrderState.Amount;
      } else {
        await approve(
          ContractAddress,
          OrderState.CurrencyTokenAddress,
          web3.utils
            .toBN(
              BigNumber(OrderState.Price)
                .times(
                  BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                )
                .times(BigNumber(OrderState.Amount))
            )
            .toString(),
          ChainId,
          CONTRACT_TYPE.ERC20
        );
      }

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: value,
        data: contract.methods
          .buyAsset([
            OrderState.ContractType,
            OrderState.Creator,
            OrderState.NftAddress,
            OrderState.TokenId,
            OrderState.Amount,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.Price.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OrderState.Price).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
            OrderState.CurrencyTokenAddress,
            Date.parse(OrderState.StartTime) / 1000,
            OrderState.Duration,
            OrderState.OrderType,
            OrderState.Buyer,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.BuyerPrice.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OrderState.BuyerPrice).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
          ])
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch {
      return reject();
    }
  });

export const placeBid = (OrderState, BidPrice, ChainId) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      let value = 0;

      if (OrderState.CurrencyTokenAddress === NULL_ADDRESS) {
        value = web3.utils.toWei(BidPrice.toString()) * OrderState.Amount;
      } else {
        await approve(
          ContractAddress,
          OrderState.CurrencyTokenAddress,
          web3.utils
            .toBN(
              BigNumber(BidPrice)
                .times(
                  BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                )
                .times(BigNumber(OrderState.Amount))
            )
            .toString(),
          ChainId,
          CONTRACT_TYPE.ERC20
        );
      }

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: value,
        data: contract.methods
          .placeBid([
            OrderState.ContractType,
            OrderState.Creator,
            OrderState.NftAddress,
            OrderState.TokenId,
            OrderState.Amount,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.Price.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OrderState.Price).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
            OrderState.CurrencyTokenAddress,
            Date.parse(OrderState.StartTime) / 1000,
            OrderState.Duration,
            OrderState.OrderType,
            OrderState.Buyer,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.BuyerPrice.toString())
              : web3.utils
                  .toBN(
                    BigNumber(BidPrice).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
          ])
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch (e) {
      return reject();
    }
  });

export const cancelListing = (OrderState, ChainId) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: 0,
        data: contract.methods
          .cancelOrder([
            OrderState.ContractType,
            OrderState.Creator,
            OrderState.NftAddress,
            OrderState.TokenId,
            OrderState.Amount,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.Price.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OrderState.Price).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
            OrderState.CurrencyTokenAddress,
            Date.parse(OrderState.StartTime) / 1000,
            OrderState.Duration,
            OrderState.OrderType,
            OrderState.Buyer,
            OrderState.CurrencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OrderState.BuyerPrice.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OrderState.BuyerPrice).times(
                      BigNumber(10).pow(BigNumber(OrderState.CurrencyDecimals))
                    )
                  )
                  .toString(),
          ])
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch (e) {
      return reject();
    }
  });

export const makeOffer = (
  ContractType,
  NftAddress,
  TokenId,
  OfferState,
  ChainId
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      let value = 0;

      if (OfferState.currencyTokenAddress === NULL_ADDRESS) {
        value =
          web3.utils.toWei(OfferState.price.toString()) * OfferState.amount;
      } else {
        await approve(
          ContractAddress,
          OfferState.currencyTokenAddress,
          web3.utils
            .toBN(
              BigNumber(OfferState.price)
                .times(
                  BigNumber(10).pow(BigNumber(OfferState.currencyTokenDecimals))
                )
                .times(BigNumber(OfferState.amount))
            )
            .toString(),
          CONTRACT_TYPE.ERC20
        );
      }

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: value,
        data: contract.methods
          .makeOffer(
            [ContractType, NftAddress, TokenId],
            OfferState.currencyTokenAddress === NULL_ADDRESS
              ? web3.utils.toWei(OfferState.price.toString())
              : web3.utils
                  .toBN(
                    BigNumber(OfferState.price).times(
                      BigNumber(10).pow(
                        BigNumber(OfferState.currencyTokenDecimals)
                      )
                    )
                  )
                  .toString(),
            OfferState.amount,
            OfferState.currencyTokenAddress
          )
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch (e) {
      return reject();
    }
  });

export const cancelOffer = (
  ContractType,
  NftAddress,
  TokenId,
  OfferState,
  ChainId
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: 0,
        data: contract.methods
          .cancelOffer(
            [ContractType, NftAddress, TokenId],
            [
              OfferState.OfferAddress,
              OfferState.OfferCurrencyTokenAddress === NULL_ADDRESS
                ? web3.utils.toWei(OfferState.OfferPrice.toString())
                : web3.utils
                    .toBN(
                      BigNumber(OfferState.OfferPrice).times(
                        BigNumber(10).pow(
                          BigNumber(OfferState.CurrencyDecimals)
                        )
                      )
                    )
                    .toString(),
              OfferState.OfferAmount,
              OfferState.OfferCurrencyTokenAddress,
              Date.parse(OfferState.OfferTime) / 1000,
            ]
          )
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch (e) {
      return reject();
    }
  });

export const acceptOffer = (
  ContractType,
  NftAddress,
  TokenId,
  OfferState,
  ChainId
) =>
  new Promise(async (resolve, reject) => {
    try {
      if (web3Modal.cachedProvider) {
        provider = await web3Modal.connect();
      } else {
        provider = await web3Modal.connect();
        window.location.reload();
      }

      const web3 = new Web3(provider);

      await switchNetwork(ChainId);

      const ContractAddress = await getMarketplaceContractAddress();
      const ContractData = await readContractABI();
      const WalletAddress = await getCurrentWalletAddress();

      const contract = new web3.eth.Contract(ContractData, ContractAddress);

      await setApprovalForAll(
        ContractAddress,
        NftAddress,
        ChainId,
        ContractType
      );

      const tx = {
        from: WalletAddress,
        to: ContractAddress,
        value: 0,
        data: contract.methods
          .acceptOffer(
            [ContractType, NftAddress, TokenId],
            [
              OfferState.OfferAddress,
              OfferState.OfferCurrencyTokenAddress === NULL_ADDRESS
                ? web3.utils.toWei(OfferState.OfferPrice.toString())
                : web3.utils
                    .toBN(
                      BigNumber(OfferState.OfferPrice).times(
                        BigNumber(10).pow(
                          BigNumber(OfferState.CurrencyDecimals)
                        )
                      )
                    )
                    .toString(),
              OfferState.OfferAmount,
              OfferState.OfferCurrencyTokenAddress,
              Date.parse(OfferState.OfferTime) / 1000,
            ]
          )
          .encodeABI(),
      };

      await web3.eth.sendTransaction(tx);
      return resolve({});
    } catch (e) {
      return reject();
    }
  });
