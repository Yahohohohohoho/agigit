import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
} from "@nextui-org/react";
import { AcmeLogo } from "../icon/AcmeLogo";

export default function Narbar() {
  return (
    <Navbar className="dark-gradient-bg">
      <NavbarBrand className="w-20">
        <AcmeLogo />
        <p className="font-bold text-inherit text-[20px]">AGI-GIT</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button
            className="bg-[#27A750] text-white font-bold px-5 py-2 rounded-lg shadow-lg transition duration-300 ease-in-out hover:bg-[#67e2c2]"
            href="#"
            variant="flat"
          >
            Connect Wallet
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
}
