import Footer from "../components/footer";
import DAppNavbar from "../dapp/components/navbar";
import { Providers } from "../dapp/providers";
import '@rainbow-me/rainbowkit/styles.css';
import "../globals.css";

export default function AgentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
            <DAppNavbar/>
                {children}
            <Footer/>
        </Providers>
      </body>
    </html>
  )
}
