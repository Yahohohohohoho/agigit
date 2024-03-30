"use client";
import { NextUIProvider } from "@nextui-org/react";
import { useEffect, useState } from "react";
import CommandLine from "../component/commandLine";
import DescriptionCard from "../component/descriptionCard";
import Navbar from "../component/navbar";
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
        getResult: () => {
          return {
            type: "remove",
            relayHash: "",
          };
        },
      },
      {
        substr: "agigit pull",
        getResult: () => {
          return {
            type: "pull",
          };
        },
      },
      {
        substr: "agigit push",
        getResult: () => {
          return {
            type: "push",
          };
        },
      },
    ];
    for (let item of subStrList) {
      if (command.toLocaleLowerCase().includes(item.substr)) {
        result = { ...result, ...item.getResult(command.toLocaleLowerCase()) };
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

  useEffect(() => {
    setResult(parsingCommand(command));
  }, [command]);

  useEffect(() => {
    if (result?.type === "pull") {
      setPullCardDom(<TransferCard key="pull" {...result} />);
    }
    if (result?.type === "push") {
      setPushCardDom(<TransferCard key="push" {...result} />);
    }
  }, [result]);

  return (
    <NextUIProvider>
      <AppContext>
        <div className="flex min-h-screen flex-col p-24">
          <Navbar />
          <CommandLine setCommand={setCommand} />
          <div className="flex flex-row px-6 w-full">
            {result?.relayHash && <DescriptionCard key="add" {...result} />}
            {pullCardDom}
            {pushCardDom}
          </div>
        </div>
      </AppContext>
    </NextUIProvider>
  );
}
