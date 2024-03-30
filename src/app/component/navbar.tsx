import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "../icon/AcmeLogo";
import AutoConnect from "./autoConnect";
import {
  useWallet,
  AccountInfo,
  NetworkInfo,
  WalletInfo,
} from "@aptos-labs/wallet-adapter-react";
import { useAutoConnect } from "./autoConnectProvider";
import { Network } from "@aptos-labs/ts-sdk";
import { Image } from "@nextui-org/react";
import TestPage from "./testPage";

// TODO: Verify public key matches account
function WalletProps(props: {
  account: AccountInfo | null;
  network: NetworkInfo | null;
  wallet: WalletInfo | null;
}) {
  const { account, network, wallet } = props;
  console.log("wallet: ", wallet);
  const isValidNetworkName = () => {
    // TODO: Do we allow non lowercase
    return Object.values<string | undefined>(Network).includes(
      props.network?.name,
    );
  };

  return (
    <div className="text-[#fff]">
      <tr>
        <div>
          <h3>Wallet Name</h3>
        </div>
        <div>
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
        </div>
      </tr>
    </div>
  );
}

export default function Narbar() {
  return (
    <Navbar className="dark-gradient-bg">
      <NavbarBrand className="w-20">
        <AcmeLogo />
        <p className="font-bold text-inherit text-[20px]">AGI-GIT</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <div className="flex items-center"></div>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
