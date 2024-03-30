import { greenBtnCss } from "@/app/constant/tailwind";
import {
  Wallet,
  WalletName,
  WalletReadyState,
  isRedirectable,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import { Dispatch, ReactNode, SetStateAction } from "react";
import { useAlert } from "../alert/alertProvider";

const WalletButtons = () => {
  const { wallets, connect, connected } = useWallet();
  // 只取Pontern登入
  const pontemWallet: any = wallets?.[1] ?? {};
  pontemWallet.name = "Connect Wallet By Pontem";
  const showWallet: any = [pontemWallet] ?? [];
  const { setErrorAlertMessage } = useAlert();

  return (
    <>
      {showWallet?.map((wallet: Wallet) => {
        return WalletView(wallet, connect, connected, setErrorAlertMessage);
      })}
    </>
  );
};

const WalletView = (
  wallet: Wallet,
  connect: (walletName: WalletName) => void,
  connected: boolean,
  setErrorAlertMessage: Dispatch<SetStateAction<ReactNode>>,
) => {
  const isWalletReady =
    wallet.readyState === WalletReadyState.Installed ||
    wallet.readyState === WalletReadyState.Loadable;
  const mobileSupport = wallet.deeplinkProvider;

  const onWalletConnectRequest = async (walletName: WalletName) => {
    try {
      await connect(walletName);
    } catch (error: any) {
      setErrorAlertMessage(error);
    }
  };

  /**
   * If we are on a mobile browser, adapter checks whether a wallet has a `deeplinkProvider` property
   * a. If it does, on connect it should redirect the user to the app by using the wallet's deeplink url
   * b. If it does not, up to the dapp to choose on the UI, but can simply disable the button
   * c. If we are already in a in-app browser, we dont want to redirect anywhere, so connect should work as expected in the mobile app.
   *
   * !isWalletReady - ignore installed/sdk wallets that dont rely on window injection
   * isRedirectable() - are we on mobile AND not in an in-app browser
   * mobileSupport - does wallet have deeplinkProvider property? i.e does it support a mobile app
   */

  if (!isWalletReady && isRedirectable()) {
    // wallet has mobile app
    if (mobileSupport) {
      return (
        <button
          className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 hover:bg-blue-700`}
          disabled={false}
          key={wallet.name}
          onClick={() => onWalletConnectRequest(wallet.name)}
        >
          <>{wallet.name}</>
        </button>
      );
    }
    // wallet does not have mobile app
    return (
      <button
        className={`bg-blue-500 text-white font-bold py-2 px-4 rounded mr-4 opacity-50 cursor-not-allowed`}
        disabled={true}
        key={wallet.name}
      >
        <>{wallet.name} - Desktop Only</>
      </button>
    );
  } else {
    // we are on desktop view
    return (
      <>
        {connected && (
          <Button
            className={greenBtnCss}
            disabled={!isWalletReady}
            key={wallet.name}
            onClick={() => onWalletConnectRequest(wallet.name)}
            variant="flat"
          >
            <>{wallet.name}</>
          </Button>
        )}
        {!connected && (
          <Button className={greenBtnCss}>
            <Image
              src={wallet.icon}
              width={20}
              height={20}
              alt="icon"
              className="mr-2"
            />
            已连接
          </Button>
        )}
      </>
    );
  }
};
export default WalletButtons;
