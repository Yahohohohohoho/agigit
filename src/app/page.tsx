import Navbar from "./component/navbar";
import CommandLine from "./component/commandLine";
import TransferCard from "./component/transferCard";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col p-24">
      <Navbar />
      <CommandLine />
      <TransferCard />
    </div>
  );
}
