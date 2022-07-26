export const getRemainAmount = (orders, owners, wallet_address) => {
  const ownerInd = owners?.findIndex(
    (owner) => owner.Wallet.toUpperCase() === wallet_address?.toUpperCase()
  );
  let amountOnSale = 0;
  orders?.forEach((order) => {
    if (order.Creator.toUpperCase() === wallet_address?.toUpperCase()) {
      amountOnSale += order.Amount;
    }
  });

  if (ownerInd === -1) {
    return true;
  }

  return owners && owners[ownerInd].Amount <= amountOnSale;
};

export const getOrderState = (order_info, wallet_address) => {
  if (!order_info) {
    return -1;
  }
  if (order_info.Creator?.toUpperCase() === wallet_address?.toUpperCase()) {
    return 1;
  }
  if (order_info.OrderType === 0) {
    return 2;
  }
  if (order_info.OrderType === 1) {
    return 3;
  }
  return -1;
};

export const getDeltaTime = (startTime, curTime, duration) => {
  return parseInt(
    (new Date(startTime).getTime() - new Date(curTime).getTime()) / 1000 +
      duration
  );
};

export const getOwnCount = (owners, wallet_address) => {
  if (!owners) return 0;

  let owned = 0;

  owners?.forEach((owner) => {
    if (owner.Wallet?.toUpperCase() === wallet_address?.toUpperCase())
      owned += owner.Amount;
  });

  return owned;
};

export const isOwner = (owners, wallet_address) => {
  if (!owners || !wallet_address) {
    return -1;
  }

  return owners?.findIndex(
    (owner) => owner.Wallet?.toUpperCase() === wallet_address?.toUpperCase()
  );
};

export const zeroPad = (num, numZeros) => {
  var n = Math.abs(num);
  var zeros = Math.max(0, numZeros - Math.floor(n).toString().length);
  var zeroString = Math.pow(10, zeros).toString().substr(1);
  if (num < 0) {
    zeroString = "-" + zeroString;
  }

  return zeroString + n;
};

export const walletAddressAbbr = (walletAddress) => {
  return (
    String(walletAddress).substring(0, 6) +
    "..." +
    String(walletAddress).substring(38)
  );
};
