'use client';

import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react'

export default function LoadingOverlay() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setShow(false), 3000); // Simulate loading
    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-[#1a1a1a] transition-opacity duration-500">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="animate-spin w-20 h-20 text-blue-500" />
        <p className="text-gray-800 dark:text-gray-100 text-lg font-medium">
          Loading BeraFolio
        </p>
      </div>
    </div>
  );
}
