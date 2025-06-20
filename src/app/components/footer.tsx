'use client';
import Link from 'next/link';
import React from 'react';

const Footer = () => { 
    return (
    <footer className="w-full py-2 px-6 flex justify-between items-center background-white-">
      <div className="h-24">
        {/* <img src="/api/placeholder/100/120" alt="Logo"  /> */}
      </div>
      <div className="flex gap-8 text-m text-white">
        <div>
            <div className="flex flex-row items-center space-x-4">
                <Link href="/landing" className="hover:text-blue-800 dark:hover:text-orange-800"> Home </Link>
                <Link href="/about" className="hover:text-blue-800 dark:hover:text-orange-800"> About </Link>
                {/* <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white-800">Twitter</a> */}
                <a href="https://discord.com/" target="_blank" rel="noopener noreferrer" className='hover:text-blue-800 dark:hover:text-orange-800'> Discord</a>
                {/* <a href="https://github.com/" target="_blank" rel="noopener noreferrer" className="hover:text-white-800">GitHub</a> */}
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