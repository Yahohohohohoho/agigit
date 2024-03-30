"use client";
import Navbar from "./component/navbar";
import CommandLine from "./component/commandLine";
import TransferCard from "./component/transferCard";
import { AppContext } from "./component/appContext";
import TestPage from "./component/testPage";
import { NextUIProvider } from "@nextui-org/react";

export default function Home() {
  return (
    <NextUIProvider>
      <AppContext>
        <div className="flex min-h-screen flex-col p-24">
          <Navbar />
          <CommandLine />
          <TransferCard />
        </div>
      </AppContext>
    </NextUIProvider>
  );
}
