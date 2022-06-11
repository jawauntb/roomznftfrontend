import { Contract, Wallet, ethers, BigNumber } from 'ethers'
import {
  TransactionReceipt,
  TransactionResponse
} from '@ethersproject/providers'

import Erc721Abi from './abis/Erc721Abi.json'

class ERC721Service {

  constructor(
    provider,
    tokenAddress,
    signerAddress
  ) {
    this.provider = provider
    if (signerAddress) {
      const signer = provider.getSigner()
      this.contract = new ethers.Contract(
        tokenAddress,
        Erc721Abi,
        provider
      ).connect(signer)
    } else {
      this.contract = new ethers.Contract(tokenAddress, Erc721Abi, provider)
    }
  }

  // READ FUNCTIONS
  // ==============

  mintPrice = async () => {
    const price = await this.contract.tokenCost()
    return BigNumber.from(price)
  }

  maxMintPerTx = async () => {
    const maxMint = await this.contract.maxMintPerTx()
    return maxMint
  }

  maxSupply = async () => {
    const maxSupply = await this.contract.MAX_SUPPLY()
    return maxSupply
  }

  royaltyAddress = async () => {
    const royaltyAddress = await this.contract.ROYALTY_ETH_ADDRESS()
    return royaltyAddress
  }

  balanceOf = async (account) => {
    const balanceOf = await this.contract.balanceOf(account)
    return balanceOf
  }

  baseUri = async ()  => {
    const baseUri = await this.contract.baseURI()
    return baseUri
  }

  isSaleActive = async () => {
    const isSaleActive = await this.contract.isSaleActive()
    return isSaleActive
  }

  name = async () => {
    const name = await this.contract.name()
    return name
  }

  ownerOf = async (tokenId) => {
    const ownerOf = await this.contract.ownerOf(tokenId)
    return ownerOf
  }

  tokenUri = async (tokenId) => {
    const tokenUri = await this.contract.tokenURI(tokenId)
    return tokenUri
  }

  totalSupply = async () => {
    const totalSupply = await this.contract.totalSupply()
    return totalSupply
  }

  // WRITE FUNCTIONS
  // ===============

  mint = async (amount) => {
    const price = await this.mintPrice()
    const ethToSend = price.mul(BigNumber.from(amount))
    const tx = await this.contract.mint(amount, { value: ethToSend })
    return tx
  }

  resMint = async (amount)=> {
    const price = await this.mintPrice()
    const ethToSend = price.mul(BigNumber.from(amount))
    const tx = await this.contract.mint(amount, { value: ethToSend })
    return await tx.wait()
  }
}

export { ERC721Service }