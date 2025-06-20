import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "BeraDapp",
  description: "Bera Chain Dapp",
  icons: ["https://avatars.githubusercontent.com/u/96059542"]
};

export default function Home() {
    const lines = [];
    const spacing = 32;
    const max = 8096;
    const count = max / spacing;

    for (let i = 0; i <= count; i++) {
      const pos = i * spacing;
      // Horizontal line
      lines.push(<line key={`h-${i}`} x1="0" y1={pos} x2={max} y2={pos} />);
      // Vertical line
      lines.push(<line key={`v-${i}`} x1={pos} y1="0" x2={pos} y2={max} />);
    }

  return (
    <main className="flex flex-col items-center justify-center min-h-200 py-8 px-4 text-center relative">
      {/* Background with bending lines */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <svg
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Turbulence + displacement filter */}
            <filter id="bendFilter" x="0" y="0" width="100%" height="100%">
              <feTurbulence
                type="turbulence"
                baseFrequency="0.02"
                numOctaves="3"
                result="turbulence"
                seed="2"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="turbulence"
                scale="40"
                xChannelSelector="R"
                yChannelSelector="G"
              />
            </filter>

            {/* Radial gradient mask to localize bending near text */}
            <radialGradient id="maskGradient" cx="50%" cy="40%" r="35%">
              <stop offset="0%" stopColor="white" stopOpacity="1" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>

            <mask id="textMask">
              <rect width="100%" height="100%" fill="url(#maskGradient)" />
            </mask>
          </defs>

          {/* Lines group */}
          <g
            filter="url(#bendFilter)"
            mask="url(#textMask)"
            stroke="currentColor"
            strokeWidth="1"
            opacity="0.15"
          >
            {lines}
          </g>
        </svg>
      </div>

      {/* Main text content */}
      <div className="z-10 mb-12 text-center max-w-4xl">
        <h1 className="font-bold mb-2">
          <span className="text-sand-200 text-8xl">BeraFolio</span>
          <br />
          <span className="text-orange-400 text-5xl">AI driven trading on BERA</span>
        </h1>
        <p className="text-white-400 text-2l mt-6"> Maximize on Bera with efficient AI. </p>
      </div>

      {/* Call To Action Button */}
      <div className="z-10">
        <Link href="/dapp">
          <button className="bg-orange-400 hover:bg-orange-500 hover:font-bold 
            cursor-pointer text-black py-3 px-8 rounded-lg text-lg text-1l">
            Launch the App
          </button>
        </Link>
      </div>
    </main>
   )
}
