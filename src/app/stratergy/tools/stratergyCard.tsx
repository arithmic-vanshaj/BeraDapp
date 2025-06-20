'use client';
import React, { useState } from 'react';
import StrategyInfoModal from './strategyInfo';

type StrategyCardProps = {
  strategyName: string;
  description: string;
  apr: number | string;
  yield_tag: string;
};

const StrategyCard: React.FC<StrategyCardProps> = ({ strategyName, description, apr, yield_tag}) => {
    const [showModal, setShowModal] = useState(false);
    return (
    <div className="bg-gray-900 text-white p-6 rounded-xl shadow-lg w-full width=100%">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">{strategyName}</h2>

        {yield_tag.toLowerCase().includes("high") ? (
            <span className="text-sm bg-red-700 text-white px-2 py-1 rounded-md">{yield_tag}</span>
        ) : yield_tag.includes("Max") ? (
            <span className="text-sm bg-yellow-500 text-black px-2 py-1 rounded-md">{yield_tag}</span>
        ) : yield_tag.toUpperCase().includes("BTC") ? (
            <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded-md">{yield_tag}</span>
        ) : yield_tag.toUpperCase().includes("BGT") ?(
            <span className="text-sm bg-blue-700 text-white px-2 py-1 rounded-md">{yield_tag}</span>
        ): (
            <span className="text-sm bg-green-700 text-white px-2 py-1 rounded-md">{yield_tag}</span>
        )}
      </div>

      <div className="mb-4">
        <p className="text-gray-300 text-sm">{description}</p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg mb-4">
        <p className="text-sm text-gray-400">New Position APR</p>
        <h3 className="text-2xl font-bold text-green-400">{apr}%</h3>
      </div>

      <div className="flex justify-between items-center">
        {/* <div>
          <p className="text-sm text-gray-400">Deposit Amount</p>
          <p className="text-lg">{amount}</p>
        </div> */}
        <button onClick={() => setShowModal(true)} className="bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg">
          Create Strategy
        </button>
        <StrategyInfoModal 
            show={showModal} 
            onClose={() => setShowModal(false)} 
            strategy={{
              strategyName,
              // amount,
              description,
              apr,
              yield_tag
            }}
        />
        </div>
    </div>
  );
};

export default StrategyCard;
