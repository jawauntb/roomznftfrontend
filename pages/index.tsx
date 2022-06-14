import React, { useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useConnect,
  useContractRead,
  useContractWrite,
  useSigner,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '../contract-abi.json';
import CollectionDetails from '../components/CollectionDetails';
import NFTCard from '../components/NFTCard';
import { url } from 'inspector';


const Home: NextPage = () => {
  const [totalMinted, setTotalMinted] = React.useState(0);
  const [totalSupply, setTotalSupply] = useState(0)
  const { isConnected } = useConnect();
  const [maxSupply, setMaxSupply] = useState(10000)
  const [isSaleActive, setIsSaleActive] = useState<boolean | null>(null)
  const [mintCount, setMintCount] = useState(1);

  const contractConfig = {
    addressOrName: '0x2dEe30f43dd03C22c457c3B989a4E2985F079c42',
    contractInterface: contractInterface,
  };

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractConfig, 'mint', {args: mintCount});

  const { data: totalSupplyData } = useContractRead(
    contractConfig,
    'totalSupply',
    { watch: true }
  );
  const { data: maxSupplyData } = useContractRead(
    contractConfig,
    'maxSupply',
    { watch: true }
  );
  const { data: isSaleActiveData } = useContractRead(
      contractConfig,
      'isSaleActive',
      { watch: true }
  );

  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
    if (isSaleActiveData) {
      setIsSaleActive(!!isSaleActiveData);
    }
    if (maxSupplyData) {
      setMaxSupply(maxSupplyData.toNumber());
    }
  }, [totalSupplyData, maxSupplyData, isSaleActiveData]);

  const isMinted = txSuccess;
  const backgroundImg = "/icons/0012.png";

  return (
    <div className="container" style={{ backgroundImage: `url(${backgroundImg})`, backgroundColor: 'linear-gradient(180deg, #FFCC48 0%, rgba(250, 255, 5, 0.97) 100%)' }}>
      <a style={{position: 'absolute', top:'20px'}} href="https://roomznft.xyz">
        <img src="https://see.fontimg.com/api/renderfont4/9Ydyy/eyJyIjoiZnMiLCJoIjoxMzAsInciOjIwMDAsImZzIjo2NSwiZmdjIjoiIzAwMDAwMCIsImJnYyI6IiNGRkZGRkYiLCJ0IjoxfQ/Um9vbXo/billy-hatter-pesonal-use-only.png" alt="Lettering fonts" />
      </a>
      <div className="page" >
        <div style={{ position: 'absolute', top: '2em', right: '10em' }}>
          <ConnectButton />
        </div>
        <div style={{ float: 'left' }}>
          <NFTCard
              isMinted={isMinted}
            mintData={mintData} />
        </div>
        <div style={{ float: 'right' }}>
          <CollectionDetails
              isMintLoading={isMintLoading}
              isMintStarted={isMintStarted}
              isMinted={isMinted}
              isConnected={isConnected}
              mintError={mintError}
              txError={txError}
              totalMinted={totalMinted}
              mint={mint}
              setMintAmount={setMintCount}
              mintAmount={mintCount}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
