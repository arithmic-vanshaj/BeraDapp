'use client';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import Link from 'next/link';
import React from 'react';

const Navbar = () => {
    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left Side: Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="text-2xl font-bold text-gray-900 dark:text-white">
              BeraFolio
            </Link>
            {/* Replace with actual logo if needed: <Image src="/logo.png" alt="Logo" width={...} height={...} /> */}
          </div>

          {/* Right Side: Buttons */}
          <div className="flex items-center space-x-4">
             {/* Example Placeholder Buttons - Replace with actual links/actions */}
             <a href="https://hub.berachain.com/pools/" target="_blank" className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
               Bera Pools
             </a>
             <button className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
              About
             </button>
             {/* Connect Button remains the primary way to connect/disconnect */}
             <ConnectButton
                accountStatus="address" // Simplify display in navbar
                chainStatus="icon"
                showBalance={false}
              />
          </div>
        </div>
      </div>
    </nav>
    )
}

export default Navbar 

    