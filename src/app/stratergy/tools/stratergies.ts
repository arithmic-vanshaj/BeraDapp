
export const strategies = [
  {
    strategyName: 'HONEY Strategy',
    token: "HONEY | OHM | BYUSD",
    description: 'Uses srUSD as collateral to borrow USDC and loop. Delta-neutral strategy with srUSD yield.',
    apr: 33.38,
    yield_tag: "Yield Maximizing",
  },
  {
    strategyName: 'Grow Small',
    token: "WBERA | HONEY | BERA",
    description: 'Focused on growth with small investing for passive APR with low risk.',
    apr: 218.36,
    yield_tag: "Max returns",
  },
  {
    strategyName: 'High Risk BGT strategy',
    
    token: "ETH",
    description: 'Leverages ETH position for higher returns. High risk/high reward.',
    apr: 28.77,
    yield_tag: "stable yield",
  },
  {
    strategyName: 'BTC deposit strategy',
    token: 'BTC',
    description: 'Uses BTC as collateral to farm DeFi rewards.',
    apr: 15.32,
    yield_tag: "High BGT APR"
  },
 {
    strategyName: 'GRID Strategy fluctuation strategy',
    token: 'BTC',
    description: 'Uses BTC as collateral to farm DeFi rewards.',
    apr: 15.32,
    yield_tag: "Low BGT APR",
  },
  {
    strategyName: 'Low Risk BGT Strategy',
    token: 'BTC',
    description: 'Uses BTC as collateral to farm DeFi rewards.',
    apr: 15.32,
    yield_tag: "Low BGT APR",
  },
  {
    strategyName: 'Long Hold wETH',
    token: 'ETH | wETH',
    description: 'Uses ETH as collateral to farm DeFi rewards.',
    apr: 15.32,
    yield_tag: "High BGT APR",
  },
  {
    strategyName: 'Short Dolomite Investment',
    token: 'Dolomite',
    description: 'High risk short term Dolomite Investment.',
    apr: 15.32,
    yield_tag: "High Risk BGT APR",
  },
  {
    strategyName: 'Collateral based',
    token: 'ETH | wBTC | HONEY | iBGT',
    description: 'Uses BTC as collateral to farm DeFi rewards.',
    apr: 15.32,
    yield_tag: "Low BGT APR",
  },
]