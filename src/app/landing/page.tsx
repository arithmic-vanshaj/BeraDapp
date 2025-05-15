import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BeraDapp",
  description: "Bera Chain Dapp",
  icons: ["https://avatars.githubusercontent.com/u/96059542"]
};

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-200 py-8 px-4 text-center relative">
      {/* background styles */}

      {/* Main Content */}
      <div className="z-10 mb-12">
        <h1 className="text-7xl font-bold mb-2">
          <span className="text-sand-200">BeraFolio</span>
          <br />
          <span className="text-orange-400">AI age of trading on BERA</span>
        </h1>
        <p className="text-gray-400 text-xl mt-6">Maximze on Bera with efficient AI.</p>
      </div>

      {/* Call To Action Button */}
      <div className="z-10">
        <Link href="/dapp">
          <button className="bg-orange-400 hover:bg-orange-500 cursor-pointer text-black font-bold py-3 px-8 rounded-lg text-lg">
            Launch the DApp
          </button>
        </Link>
      </div>
    </main>
   )
}
