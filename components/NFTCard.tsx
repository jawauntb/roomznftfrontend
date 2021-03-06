import FlipCard, { BackCard, FrontCard } from '../components/FlipCard';
import Image from 'next/image';

export type NFTCardProps = {
    isMinted:boolean,
    mintData:  import("@ethersproject/providers").TransactionResponse | undefined,
}



const NFTCard = ({ isMinted, mintData}: NFTCardProps) => {

    return (
    <div style={{ flex: '0 0 auto', boxShadow:'10px 10px lightblue', borderRadius: '25px'}}>
        <FlipCard>
            <FrontCard isCardFlipped={isMinted}>
                <Image
                    layout="responsive"
                    src="http://drive.google.com/uc?export=view&id=1VkYeajnkJlK1bhCcIUsgALVQGuteBwUF"
                    width="500px"
                    height="500px"
                    alt="Roomz NFT"
                />
                <h1 style={{ marginTop: 24 }}>It's free real estate</h1>
            </FrontCard>
            <BackCard isCardFlipped={isMinted}>
                <div style={{ padding: 24 }}>
                    <Image
                        src="http://drive.google.com/uc?export=view&id=1uk-e2u_17i0P7lHFQlbxvaOjwgZf9wcs"
                        width="80"
                        height="80"
                        alt="Roomz NFT"
                        style={{ borderRadius: 8 }}
                    />
                    <h2 style={{ marginTop: 24, marginBottom: 6 }}>NFT Minted!</h2>
                    <p style={{ marginBottom: 24 }}>
                        Your NFT will show up in your wallet in the next few minutes.
                    </p>
                    <p style={{ marginBottom: 6 }}>
                        View on{' '}
                        <a href={`https://rinkeby.etherscan.io/tx/${mintData?.hash}`}>
                            Etherscan
                        </a>
                    </p>
                    <p>
                        View on{' '}
                        <a
                            href={`https://testnets.opensea.io/assets/rinkeby/${mintData?.to}/1`}
                        >
                            Opensea
                        </a>
                    </p>
                </div>
            </BackCard>
        </FlipCard>
    </div>
 )
}

export default NFTCard;