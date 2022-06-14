import InputNumber from "./NumberInput";
import { BigNumber, ethers } from 'ethers'
import { useState, useEffect } from 'react'
import { useContract, useProvider } from 'wagmi'

export type CollectionDetailsProps = {
    isMintLoading: boolean,
    isMintStarted: boolean,
    isMinted: boolean,
    isConnected: boolean,
    mintError: Error | null,
    txError: Error | null,
    totalMinted: number,
    mint: () => void,
    setMintAmount: React.Dispatch<React.SetStateAction<number>>,
    mintAmount: number,
}

const CollectionDetails = ({
    isMintLoading ,
    isMintStarted,
    isMinted,
    isConnected,
    mintError,
    txError,
    totalMinted,
    mint,
    setMintAmount,
    mintAmount,
}: CollectionDetailsProps) => {
    

    return (
        <>
            <div className="container">
                <div style={{ flex: '1 1 auto' }}>
                    <div style={{ padding: '24px 24px 24px 0' }}>
                    <h1>Roomz NFT</h1>
                    <p style={{ margin: '12px 0 24px' }}>
                        {totalMinted} minted so far!
                    </p>

                    {mintError && (
                        <p style={{ marginTop: 24, color: '#FF6257' }}>
                        Error: {mintError.message}
                        </p>
                    )}
                    {txError && (
                        <p style={{ marginTop: 24, color: '#FF6257' }}>
                        Error: {txError.message}
                        </p>
                    )}

                        {isConnected && !isMinted && (
                        <>
                            <InputNumber
                            isDisabled={false}
                            onChange={(value) => setMintAmount(value)}
                            />
                            <button
                            style={{ marginTop: 24 }}
                            disabled={isMintLoading || isMintStarted}
                            className="button"
                            data-mint-loading={isMintLoading}
                            data-mint-started={isMintStarted}
                            onClick={() => mint()}
                            >
                            {isMintLoading && 'Waiting for approval'}
                            {isMintStarted && 'Minting...'}
                            {!isMintLoading && !isMintStarted && 'Mint'}
                            </button>
                            <span>{Math.round(mintAmount * 0.05 * 100) / 100}</span>
                            <span>ETH</span>
                        </>
                    )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CollectionDetails;