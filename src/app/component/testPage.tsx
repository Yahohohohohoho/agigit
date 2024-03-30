import { Network } from "@aptos-labs/ts-sdk";
import {
  AccountInfo,
  NetworkInfo,
  WalletInfo,
  useWallet,
} from "@aptos-labs/wallet-adapter-react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Col from "./wallet/col";

const WalletButtons = dynamic(() => import("./wallet/walletButtons"), {
  suspense: false,
  ssr: false,
});

const isSendableNetwork = (connected: boolean, network?: string): boolean => {
  return (
    connected &&
    (network?.toLowerCase() === Network.DEVNET.toLowerCase() ||
      network?.toLowerCase() === Network.TESTNET.toLowerCase())
  );
};

const TestPage = () => {
  const { account, connected, network, wallet } = useWallet();

  return (
    <div>
      <table className="table-auto w-full border-separate border-spacing-y-8 shadow-lg bg-white border-separate">
        <tbody>
          {connected && (
            <WalletProps wallet={wallet} network={network} account={account} />
          )}
          {connected && !isSendableNetwork(connected, network?.name) && (
            <tr>
              <Col title={true}></Col>
              <Col>
                <p style={{ color: "red" }}>
                  Transactions only work with Devnet or Testnet networks
                </p>
              </Col>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
// TODO: Verify public key matches account
function WalletProps(props: {
  account: AccountInfo | null;
  network: NetworkInfo | null;
  wallet: WalletInfo | null;
}) {
  const { account, network, wallet } = props;
  const isValidNetworkName = () => {
    // TODO: Do we allow non lowercase
    return Object.values<string | undefined>(Network).includes(
      props.network?.name,
    );
  };

  return (
    <>
      <tr>
        <Col title={true}>
          <h3>Wallet Name</h3>
        </Col>
        <Col>
          <b>Icon: </b>
          {props.wallet && (
            <Image
              src={wallet?.icon ?? ""}
              alt={wallet?.name ?? ""}
              width={25}
              height={25}
            />
          )}
          <b> Name: </b>
          {wallet?.name}
          <b> URL: </b>
          <a
            target="_blank"
            className="text-sky-600"
            rel="noreferrer"
            href={wallet?.url}
          >
            {wallet?.url}
          </a>
        </Col>
      </tr>
    </>
  );
}
export default TestPage;
