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
    if (isSaleActiveData) {
      setIsSaleActive(!!isSaleActiveData);
    }
    if (maxSupplyData) {
      setMaxSupply(maxSupplyData.toNumber());
    }
    if (totalSupplyData && maxSupplyData) {
      setTotalMinted(maxSupplyData.toNumber() - totalSupplyData.toNumber());
    }
  }, [totalSupplyData, maxSupplyData, isSaleActiveData]);

  const isMinted = txSuccess;

  return (
    <div className="page">
      <div style={{ position: 'absolute', top: '2em', right: '10em' }}>
        <ConnectButton />
      </div>
      <NFTCard
        isMinted={isMinted}
        mintData={mintData}
      />
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
  );
};

export default Home;
