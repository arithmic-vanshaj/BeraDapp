// landing page layout
import "../globals.css";
import '@rainbow-me/rainbowkit/styles.css'; // rainbowkit styles
import { Providers } from "@/app/components/providers"; // providers
import Navbar from "../components/navbar";
import LoadingOverlay from "../components/loadingScreen";
import Footer from "../components/footer";

export default function landingPage({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body> <LoadingOverlay></LoadingOverlay>
          <Providers>
            <Navbar></Navbar>
              {children}
            <Footer></Footer>
          </Providers>
      </body>
    </html>
  );
}
