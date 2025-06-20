'use client'
import React, { useState } from "react";
import {
  Navbar,
  Typography,
  Button,
  Switch,
} from "@material-tailwind/react";
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  ChatBubbleBottomCenterIcon,
} from "@heroicons/react/24/solid";
import { ConnectButton, useConnectModal } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import { config } from "../providers";
 
// nav list component
const navListItems = [
  {
    label: "Startergies",
    icon: UserCircleIcon,
    href: "/stratergy"
  },
  // {
  //   label: "BlockScan",
  //   icon: CubeTransparentIcon,
  //   href:""
  // },
  // {
  //   label: "Docs",
  //   icon: CodeBracketSquareIcon,
  //   href:""
  // },
  {
    label: "Agent",
    icon: ChatBubbleBottomCenterIcon,
    href:"/agent"
  },
  {
    label: "Dashboard",
    icon: ChatBubbleBottomCenterIcon,
    href:"/dapp"
  }
];
function NavList() {
  return (
    <ul className="mt-2 mb-4 flex flex-col gap-5 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center">
      {/* <NavListMenu /> */}
      {navListItems.map(({ label, icon, href }) => (
        <Typography
          key={label}
          as="a"
          href={href}
          variant="paragraph"
          color="gray"
          className="font-medium text-white-900 dark:text-white-900 hover:text-orange-800 flex items-center gap-2"
          placeholder=""
          onPointerEnterCapture=""
          onPointerLeaveCapture=""
        >
          {React.createElement(icon, { className: "h-[18px] w-[18px]" })}{" "}
          {label}
        </Typography>
      ))}
    </ul>
  );
}
 
export default function DAppNavbar() {
  const { openConnectModal } = useConnectModal();
  const {address, isConnected, chain} = useAccount( { config} )
  const [ismounted, setMounted] = useState(false);
  // Switch state for Agent Mode
  const [agentMode, setAgentMode] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);

    window.addEventListener(
      "resize",
      () => {},
    );
  }, []);
  
  return (
    <Navbar
      className="mx-auto bg-transparent bg-opacity-30 max-w-screen-xl p-2 mt-6 
      lg:rounded-full lg:pl-6 border border-orange-200"
      placeholder=""
      onPointerEnterCapture={() => {}}
      onPointerLeaveCapture={() => {}}
    >
      <div className="relative mx-auto flex items-center justify-between">
        <Typography
          as="a"
          href="/landing"
          className="mr-4 ml-2 cursor-pointer py-2 text-xl"
          placeholder="Bera Folio"
          onPointerEnterCapture={() => {}}
          onPointerLeaveCapture={() => {}}>
          BeraFolio
        </Typography>
        <div className="hidden lg:block">
          <NavList />
        </div>

        {!isConnected ? (
            <Button
            size="sm"
            variant="text"
            placeholder=""
            onPointerEnterCapture={() => {}}
            onPointerLeaveCapture={() => {}}
            onClick={openConnectModal}
            className="text-gray-900 cursor-pointer bg-orange-700 hover:bg-orange-600 dark:bg-orange-600 border 
            border-gray-200 font-medium rounded-lg text-sm px-5 py-2 text-center inline-flex items-center dark:border-gray-700 dark:text-white 
            dark:hover:bg-orange-700 me-2">
              Connect Wallet
            </Button>
        ) : (
          <ConnectButton.Custom>
            {({ account, openAccountModal, openChainModal, mounted }) => {
            const ready = mounted;
              return (
                <div className="flex flex-col sm:flex-row">
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="text-sm font-medium text-gray-900 dark:text-white bg-orange-500 dark:bg-orange-600 
                    border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-2 me-2 cursor-pointer 
                    hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                  >
                    {chain?.name}
                  </button>
                  <button
                    type="button" onClick={openAccountModal}
                    className="text-sm font-medium text-gray-900 dark:text-white bg-orange-500 dark:bg-orange-600 
                    border border-gray-200 dark:border-gray-700 rounded-lg px-5 py-2 me-2 cursor-pointer 
                    hover:bg-orange-600 dark:hover:bg-orange-700 transition"
                    title="Manage wallet"
                    >
                    {address?.slice(0, 6)}...{address?.slice(-4)}
                  </button>
                </div>
              );
            }}

          </ConnectButton.Custom>
        )}
      </div>
    </Navbar>
  );
}