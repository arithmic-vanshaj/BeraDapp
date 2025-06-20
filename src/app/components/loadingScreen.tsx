'use client';

import { useEffect, useState } from 'react';
import clsx from 'clsx';

export default function LoadingOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 3000); // Simulate loading
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center bg-black dark:bg-[#0f0f0f] transition-opacity duration-700 ease-in-out',
        !show && 'opacity-0 pointer-events-none'
      )}
    >
      <div className="bg-neutral-900 border border-orange-500/40 exwayer-font rounded-2xl px-12 py-10 shadow-[0_0_20px_rgba(128,0,255,0.3)]">
        <h1 className="glitch-text text-7xl font-extrabold text-orange-500 relative">
          BeraFolio
        </h1>
      </div>
    </div>
  );
}
