'use client';

export default function AboutPage() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-12 text-gray-800 dark:text-gray-100">
      <h1 className="text-4xl font-bold mb-6 text-blue-600 dark:text-blue-400">
        About BeraFolio
      </h1>
      <p className="text-lg mb-4 leading-relaxed">
        BeraFolio is an AI-powered trading application built on the BeraChain ecosystem. It’s designed to
        empower users to seamlessly manage their portfolios, with a focus on optimizing yield in DeFi protocols.
        Our portfolio optimizer automates the intricacies of swapping, intelligently selects the best pools and vaults 
        to deposit, and continuously aims to maximize returns.
      </p>
      
      <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200 mt-8 mb-4">
        Future Plans
      </h2>
      <p className="text-lg mb-4 leading-relaxed">
        Looking ahead, BeraFolio is set to evolve further with the integration of Large Language Models (LLM).
        This will enable the platform to handle a variety of strategies and provide personalized advice to users. 
        With the help of AI, users will be able to easily navigate complex DeFi strategies and customize their portfolio 
        management based on personal preferences, risk tolerance, and market conditions.
      </p>
      
      <p className="text-lg mb-4 leading-relaxed">
        Our ultimate goal is to provide an intuitive and powerful tool that enhances the trading experience while 
        maximizing yields and automating as much of the process as possible — so you can focus on the strategy, 
        not the technical details.
      </p>
    </main>
  );
}
