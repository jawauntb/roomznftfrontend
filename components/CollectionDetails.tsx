export type CollectionDetailsProps = {
    isMintLoading: boolean,
    isMintStarted: boolean,
    isMinted: boolean,
    isConnected: boolean,
    mintError: Error | null,
    txError: Error | null,
    totalMinted: number,
    mint: VoidFunction
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
                    )}
                    </div>
                </div>
            </div>
        </>
    )
}
export default CollectionDetails;