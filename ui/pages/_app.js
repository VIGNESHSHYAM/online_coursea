import "@/styles/globals.css";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import { StateContextProvider } from "../context_setup";
const App = ({ Component, pageProps }) => {
  return (
    <ThirdwebProvider activeChain={ChainId.Mumbai}>
      <StateContextProvider>
      <Component {...pageProps}/>
      </StateContextProvider>
    </ThirdwebProvider>
  );
};

export default App;
