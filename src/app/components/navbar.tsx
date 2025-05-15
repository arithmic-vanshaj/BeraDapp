"use client";
import Link from "next/link";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useState } from "react";

const Navbar = () => {
  // const [menuOpen, setMenuOpen] = useState(false);

    return (
      <nav className="flex justify-between items-center py-4 px-6 w-full">
        <div className="h-10">
          {/* // <Link href="/">
          //   <img src="/api/placeholder/50/50" alt="BeraFolio Logo"  />
          // </Link> */}
        </div>
        <div className="flex gap-4">
          <Link href="/app">
            <button className="bg-orange-400 cursor:pointer hover:bg-orange-500 text-black font-bold py-2 px-6 rounded-lg">
              Launch app
            </button>
          </Link>
        </div>
      </nav>
    );
  
  
  // return (
  //   <nav className="w-full py-4 px-6 bg-black bg-opacity-20 backdrop-blur-sm">
  //     <div className="container mx-auto flex justify-between items-center">
  //       <div className="text-white font-bold text-2xl">BeraFolio</div>
        
  //       {/* Mobile menu button */}
  //       <div className="md:hidden">
  //         <button 
  //           onClick={() => setMenuOpen(!menuOpen)}
  //           className="text-white focus:outline-none"
  //         >
  //           {menuOpen ? (
  //             <span className="text-2xl">×</span>
  //           ) : (
  //             <span className="text-xl">☰</span>
  //           )}
  //         </button>
  //       </div>
        
  //       {/* Desktop menu */}
  //       <div className="hidden md:flex space-x-8">
  //         <a href="https://hub.berachain.com/pools/" target="_blank" rel="noopener noreferrer"
  //                 className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"> Bera Pools</a>
  //               <Link href="/about" className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
  //                 About
  //               </Link>
  //             <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false}/>
  //           {/* <a href="#" className="text-white hover:text-blue-200 transition">Contact</a> */}
  //       </div>
  //     </div>
      
  //     {/* Mobile menu */}
  //     {menuOpen && (
  //       <div className="md:hidden mt-2 bg-black bg-opacity-30 rounded p-4">
  //         <div className="flex flex-col space-y-3">
  //           <a href="https://hub.berachain.com/pools/" target="_blank" rel="noopener noreferrer"
  //               className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"> Bera Pools</a>
  //             <Link href="/about" className="hidden sm:block px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
  //               About
  //             </Link>
  //           <ConnectButton accountStatus="address" chainStatus="icon" showBalance={false}/>
  //           <a href="#" className="text-white hover:text-blue-200 transition">Contact</a>
  //         </div>
  //       </div>
  //     )}
  //   </nav>
  // );
};

export default Navbar;
