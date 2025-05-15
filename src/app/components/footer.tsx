'use client';
import Link from 'next/link';
import React from 'react';

const Footer = () => { 
    return (
    <footer className="w-full py-4 px-6 flex justify-between items-end background-white-">
      <div className="h-24">
        {/* <img src="/api/placeholder/100/120" alt="Logo"  /> */}
      </div>
      <div className="flex gap-8 text-sm text-gray-400">
        <div>
            <div className="flex flex-row items-center space-x-4">
                <Link href="/"> Home </Link>
                <Link href="/about"> About </Link>
                <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Twitter</a>
                <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">Discord</a>
                <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white">GitHub</a>
            </div>
        </div>
      </div>
      <div className="h-24">
        {/* <img src="/api/placeholder/100/120" alt="Bear Character 2"  /> */}
      </div>
    </footer>
  );
}

export default Footer;