import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/react";
import dynamic from "next/dynamic";
import { AcmeLogo } from "../icon/AcmeLogo";

const WalletButtons = dynamic(() => import("./wallet/walletButtons"), {
  suspense: false,
  ssr: false,
});

export default function Narbar() {
  return (
    <Navbar className="dark-gradient-bg rounded-[20px]">
      <NavbarBrand className="w-20">
        <AcmeLogo />
        <p className="font-bold text-inherit text-[28px]">AGI-GIT</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <WalletButtons />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
