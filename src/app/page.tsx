"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { AppContext } from "./component/appContext";
import CommandLine from "./component/commandLine";
import Navbar from "./component/navbar";
import TransferCard from "./component/transferCard";

export default function Home() {
  function parsingCommand(command: string) {
    let result: {
      type: string | "add" | "remove" | "pull" | "push" | null;
      relayHash: string;
    } = {
      type: null,
      relayHash: "",
    };
    const subStrList = [
      {
        substr: "agigit relay add",
        getResult: (command: string) => {
          const list = command.split(" ");
          return {
            type: "add",
            relayHash: list[list.length - 1],
          };
        },
      },
      {
        substr: "agigit relay remove",
        getResult: (command: string) => {
          return {
            type: "remove",
            relayHash: "",
          };
        },
      },
      {
        substr: "agigit pull",
        getResult: (command: string) => {
          return {
            type: "pull",
          };
        },
      },
      {
        substr: "agigit push",
        getResult: (command: string) => {
          return {
            type: "push",
          };
        },
      },
    ];
    for (let item of subStrList) {
      if (command.includes(item.substr)) {
        result = { ...result, ...item.getResult(command) };
        break;
      } else {
        console.log("error command!");
      }
    }
    return result;
  }
  const [command, setCommand] = useState("");
  const [cardDom, setCardDom] = useState<any>();
  function getTransferCard(params: any) {
    return <TransferCard {...params} />;
  }
  useEffect(() => {
    setCardDom(getTransferCard(parsingCommand(command)));
  }, [command]);

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
