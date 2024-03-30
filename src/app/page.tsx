"use client";
import { NextUIProvider } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AppContext } from "./component/wallet/appContext";

const WalletButtons = dynamic(
  () => import("./component/wallet/walletButtons"),
  {
    suspense: false,
    ssr: false,
  },
);

export default function Page() {
  const router = useRouter();
  const [loginState, setLoginState] = useState<boolean>(false);

  useEffect(() => {
    if (loginState) {
      void router.push("/home");
    }
  }, [loginState, router]);

  return (
    <NextUIProvider>
      <AppContext>
        <div
          className={`round-lg bg-[url("/login-bg.png")] bg-cover bg-center bg-no-repeat h-[100vh] items-center justify-center flex`}
        >
          <WalletButtons setLoginState={setLoginState} />
        </div>
      </AppContext>
    </NextUIProvider>
  );
}
