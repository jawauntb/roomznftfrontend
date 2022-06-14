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
            <div className="container" style={{backgroundColor: '#40E0D0', borderRadius:'25px', marginLeft: '100px', padding:'20px', boxShadow:'10px 10px lightblue'}}>
                <div style={{ flex: '1 1 auto', color:'white' }}>
                    <div style={{ padding: '24px 24px 24px 0' }}>
                    <p style={{ margin: '12px 0 24px', fontSize: '72px', fontWeight: 'bold' }}>
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
                            style={{boxSizing: 'border-box', marginTop: 24, marginBottom:'12px', fontWeight: 'bold', fontSize: '30px'}}
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
                            <div style={{ fontSize:"25px", fontWeight:'bold'}}>
                                <span>{Math.round(mintAmount * 0.05 * 100) / 100}</span>
                                <span>ETH</span>
                            </div>
                        </>
                    )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CollectionDetails;