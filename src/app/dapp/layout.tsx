'use client';
import "../globals.css";
import '@rainbow-me/rainbowkit/styles.css';
import Footer from "../components/footer";
import DAppNavbar from "./components/navbar";
import { Providers } from "./providers";


export default function DappLayout({ children }: { children: React.ReactNode }) {
  return (
        <Providers>
          <DAppNavbar/>
            {children} 
          <Footer></Footer>
        </Providers>
  );
}
