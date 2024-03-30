import {
  AptosWalletAdapterProvider,
  NetworkName,
} from "@aptos-labs/wallet-adapter-react";
import { AutoConnectProvider, useAutoConnect } from "./autoConnectProvider";
import { FC, ReactNode } from "react";
import { PontemWallet } from "@pontem/wallet-adapter-plugin";
import { AlertProvider, useAlert } from "./alertProvider";
import { IdentityConnectWallet } from "@identity-connect/wallet-adapter-plugin";
import { Network } from "@aptos-labs/ts-sdk";

const WalletContextProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const { autoConnect } = useAutoConnect();
  const { setErrorAlertMessage } = useAlert();

  const wallets = [
    new IdentityConnectWallet("57fa42a9-29c6-4f1e-939c-4eefa36d9ff5", {
      networkName: Network.TESTNET,
    }),
    // Blocto supports Testnet/Mainnet for now.

    new PontemWallet(),
  ];

  return (
    <AptosWalletAdapterProvider
      plugins={wallets}
      autoConnect={autoConnect}
      onError={(error) => {
        console.log("Custom error handling", error);
        setErrorAlertMessage(error);
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
};

export const AppContext: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <AutoConnectProvider>
      <AlertProvider>
        <WalletContextProvider>{children}</WalletContextProvider>
      </AlertProvider>
    </AutoConnectProvider>
  );
};
