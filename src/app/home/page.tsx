"use client";
import { Navbar, NextUIProvider } from "@nextui-org/react";
import { useEffect, useRef, useState } from "react";
import CommandLine from "../component/commandLine";
import DescriptionCard from "../component/descriptionCard";
import TransferCard from "../component/transferCard";
import { AppContext } from "../component/wallet/appContext";

interface commandResult {
  type: string | "add" | "remove" | "pull" | "push" | null;
  relayHash: string;
}

export default function Home() {
  function parsingCommand(command: string) {
    let result: commandResult = {
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
  const [result, setResult] = useState<commandResult>();
  const [pullCardDom, setPullCardDom] = useState<any>();
  const [pushCardDom, setPushCardDom] = useState<any>();
  const relayHash = useRef("");

  useEffect(() => {
    setResult(parsingCommand(command));
    if (result?.type === "add") {
      relayHash.current = result!.relayHash;
    }
    if (result?.type === "remove") {
      relayHash.current = "";
    }
    if (result?.type === "pull") {
      setPullCardDom(
        <TransferCard key="pull" className="fade-animation" {...result} />,
      );
    }
    if (result?.type === "push") {
      setPushCardDom(
        <TransferCard key="push" className="fade-animation" {...result} />,
      );
    }
  }, [command]);

  return (
    <NextUIProvider>
      <AppContext>
        <div className="flex min-h-screen flex-col p-24">
          <Navbar />
          <CommandLine setCommand={setCommand} />
          <TransferCard />
          <div className="flex flex-row px-6 w-full">
            {relayHash.current && (
              <DescriptionCard
                key="add"
                className="fade-animation"
                {...result}
              />
            )}
            {pullCardDom}
            {pushCardDom}
          </div>
        </div>
      </AppContext>
    </NextUIProvider>
  );
}
