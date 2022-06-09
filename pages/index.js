import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import "@rainbow-me/rainbowkit/styles.css";

import {
  getDefaultWallets,
  RainbowKitProvider,
  ConnectButton,
} from '@rainbow-me/rainbowkit';
import {
  chain,
  configureChains,
  createClient,
  WagmiConfig,
} from 'wagmi';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';

const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [
    alchemyProvider(),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Roomz NFT App",
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
});


export default function Home() {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <div
          style={{
            position: "fixed",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <ConnectButton coolmode />
        </div>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
