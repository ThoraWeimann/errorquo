import "./App.css";

import { Routes, Route } from "react-router-dom";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Landing from "./pages/Landing";

import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  darkTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import {
  mainnet,
  polygon,
  optimism,
  arbitrum,
  polygonMumbai,
} from "wagmi/chains";

import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, polygonMumbai],
  [publicProvider()]
);

const projectId = "YOUR_PROJECT_ID";
const { connectors } = getDefaultWallets({
  appName: "My RainbowKit App",
  projectId,
  chains,
});

const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

function App() {
  return (
    <div className="App">
      <WagmiConfig config={config}>
        <RainbowKitProvider
          coolMode
          chains={chains}
          theme={darkTheme({
            accentColor: "#04807b",
            accentColorForeground: "white",
            borderRadius: "medium",
          })}
        >
          <Routes>
            <Route exact path="/" element={<Landing />} />
            <Route exact path="/about" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
          </Routes>
        </RainbowKitProvider>
      </WagmiConfig>
    </div>
  );
}

export default App;
