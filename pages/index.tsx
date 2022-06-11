import React from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import type { NextPage } from 'next';
import {
  useConnect,
  useContractRead,
  useContractWrite,
  useWaitForTransaction,
} from 'wagmi';
import contractInterface from '../contract-abi.json';
import CollectionDetails from '../components/CollectionDetails';
import NFTCard from '../components/NFTCard';

const contractConfig = {
  addressOrName: '0x86fbbb1254c39602a7b067d5ae7e5c2bdfd61a30',
  contractInterface: contractInterface,
};

const Home: NextPage = () => {
  const [totalMinted, setTotalMinted] = React.useState(0);
  const { isConnected } = useConnect();

  const {
    data: mintData,
    write: mint,
    isLoading: isMintLoading,
    isSuccess: isMintStarted,
    error: mintError,
  } = useContractWrite(contractConfig, 'mint');

  const { data: totalSupplyData } = useContractRead(
    contractConfig,
    'totalSupply',
    { watch: true }
  );

  const { isSuccess: txSuccess, error: txError } = useWaitForTransaction({
    hash: mintData?.hash,
  });

  React.useEffect(() => {
    if (totalSupplyData) {
      setTotalMinted(totalSupplyData.toNumber());
    }
  }, [totalSupplyData]);

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
      />
    </div>
  );
};

export default Home;
