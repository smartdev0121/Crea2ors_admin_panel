import whitelist from 'src/config/whitelist'
import { getCurrentWalletAddress } from './wallet'

export const getUserRole = async () => {
  const acct = await getCurrentWalletAddress()

  if (acct) {
    const index = whitelist.findIndex((address) => address === acct)
    if (index !== -1) return true
  }
  return false
}
