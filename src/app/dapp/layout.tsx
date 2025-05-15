// app/dapp/layout.tsx
import { Providers } from "../components/providers"; // use the same providers


export default function DappLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}   {/* Dapp content */}
        </Providers>
      </body>
    </html>
  );
}
