const BERA_TOKEN_ADDRESS="0x0000000000000000000000000000000000000000"
const IBERA_TOKEN_ADDRESS="0x9b6761bf2397Bb5a6624a856cC84A3A14Dcd3fe5"
const BERACHAIN_BASE_API = "https://api.berachain.com"
const HONEY_TOKEN_ADDRESS="0xFCBD14DC51f0A4d49d5E53C2E0950e0bC26d0Dce"
const USDC_TOKEN_ADDRESS="0x549943e04f40284185054145c6E4e9568C1D3241"
const WBERA_TOKEN_ADDRESS="0x6969696969696969696969696969696969696969"
const WBTC_TOKEN_ADDRESS="0x0555E30da8f98308EdB960aa94C0Db47230d2B9c"
const WETH_TOKEN_ADDRESS="0x2F6F07CDcf3588944Bf4C42aC74ff24bF56e7590"
const RPC_URL = "https://rpc.berachain.com/"
const MAX_UINT256 = BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff");
const VAULT_ADDRESS = "0x4Be03f781C497A489E3cB0287833452cA9B9E80B"
// exporting the token addresses
export {
    BERA_TOKEN_ADDRESS,
    IBERA_TOKEN_ADDRESS,
    BERACHAIN_BASE_API,
    HONEY_TOKEN_ADDRESS,
    USDC_TOKEN_ADDRESS,
    WBERA_TOKEN_ADDRESS,
    WBTC_TOKEN_ADDRESS,
    WETH_TOKEN_ADDRESS,
    RPC_URL,
    MAX_UINT256,
    VAULT_ADDRESS
}

// contracts ABI
// wrapping bera to wbera
export const wbera_abi =  [
    {
      "type": "receive",
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "DOMAIN_SEPARATOR",
      "inputs": [],
      "outputs": [
        {
          "name": "result",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "result",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        {
          "name": "spender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "result",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "uint8",
          "internalType": "uint8"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [],
      "outputs": [],
      "stateMutability": "payable"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "nonces",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        }
      ],
      "outputs": [
        {
          "name": "result",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "permit",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "value",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "deadline",
          "type": "uint256",
          "internalType": "uint256"
        },
        {
          "name": "v",
          "type": "uint8",
          "internalType": "uint8"
        },
        {
          "name": "r",
          "type": "bytes32",
          "internalType": "bytes32"
        },
        {
          "name": "s",
          "type": "bytes32",
          "internalType": "bytes32"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [
        {
          "name": "",
          "type": "string",
          "internalType": "string"
        }
      ],
      "stateMutability": "pure"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [
        {
          "name": "result",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [
        {
          "name": "",
          "type": "bool",
          "internalType": "bool"
        }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [
        {
          "name": "amount",
          "type": "uint256",
          "internalType": "uint256"
        }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        {
          "name": "owner",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "spender",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "deposit",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        {
          "name": "from",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawal",
      "inputs": [
        {
          "name": "to",
          "type": "address",
          "indexed": true,
          "internalType": "address"
        },
        {
          "name": "amount",
          "type": "uint256",
          "indexed": false,
          "internalType": "uint256"
        }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "AllowanceOverflow",
      "inputs": []
    },
    {
      "type": "error",
      "name": "AllowanceUnderflow",
      "inputs": []
    },
    {
      "type": "error",
      "name": "ETHTransferFailed",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InsufficientAllowance",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InsufficientBalance",
      "inputs": []
    },
    {
      "type": "error",
      "name": "InvalidPermit",
      "inputs": []
    },
    {
      "type": "error",
      "name": "PermitExpired",
      "inputs": []
    },
    {
      "type": "error",
      "name": "TotalSupplyOverflow",
      "inputs": []
    }
  ] as const 

export const honey_abi = [
    [
        {
          "type": "constructor",
          "inputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "DEFAULT_ADMIN_ROLE",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "DOMAIN_SEPARATOR",
          "inputs": [],
          "outputs": [
            {
              "name": "result",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "UPGRADE_INTERFACE_VERSION",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "string",
              "internalType": "string"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "allowance",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "spender",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [
            {
              "name": "result",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "approve",
          "inputs": [
            {
              "name": "spender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs":    [
            {
              "name": "",
              "type": "bool",
              "internalType": "bool"
            }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "balanceOf",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [
            {
              "name": "result",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "burn",
          "inputs": [
            {
              "name": "from",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "decimals",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "uint8",
              "internalType": "uint8"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "factory",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "address",
              "internalType": "address"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "getRoleAdmin",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "grantRole",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "account",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "hasRole",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "account",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "bool",
              "internalType": "bool"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "initialize",
          "inputs": [
            {
              "name": "_governance",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "_factory",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "mint",
          "inputs": [
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "name",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "string",
              "internalType": "string"
            }
          ],
          "stateMutability": "pure"
        },
        {
          "type": "function",
          "name": "nonces",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [
            {
              "name": "result",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "permit",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "spender",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "value",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "deadline",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "v",
              "type": "uint8",
              "internalType": "uint8"
            },
            {
              "name": "r",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "s",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "proxiableUUID",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "renounceRole",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "callerConfirmation",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "revokeRole",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "internalType": "bytes32"
            },
            {
              "name": "account",
              "type": "address",
              "internalType": "address"
            }
          ],
          "outputs": [],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "supportsInterface",
          "inputs": [
            {
              "name": "interfaceId",
              "type": "bytes4",
              "internalType": "bytes4"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "bool",
              "internalType": "bool"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "symbol",
          "inputs": [],
          "outputs": [
            {
              "name": "",
              "type": "string",
              "internalType": "string"
            }
          ],
          "stateMutability": "pure"
        },
        {
          "type": "function",
          "name": "totalSupply",
          "inputs": [],
          "outputs": [
            {
              "name": "result",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "stateMutability": "view"
        },
        {
          "type": "function",
          "name": "transfer",
          "inputs": [
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "bool",
              "internalType": "bool"
            }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "transferFrom",
          "inputs": [
            {
              "name": "from",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "to",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ],
          "outputs": [
            {
              "name": "",
              "type": "bool",
              "internalType": "bool"
            }
          ],
          "stateMutability": "nonpayable"
        },
        {
          "type": "function",
          "name": "upgradeToAndCall",
          "inputs": [
            {
              "name": "newImplementation",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "data",
              "type": "bytes",
              "internalType": "bytes"
            }
          ],
          "outputs": [],
          "stateMutability": "payable"
        },
        {
          "type": "event",
          "name": "Approval",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "spender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "Initialized",
          "inputs": [
            {
              "name": "version",
              "type": "uint64",
              "indexed": false,
              "internalType": "uint64"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "RoleAdminChanged",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
            },
            {
              "name": "previousAdminRole",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
            },
            {
              "name": "newAdminRole",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "RoleGranted",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
            },
            {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "sender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "RoleRevoked",
          "inputs": [
            {
              "name": "role",
              "type": "bytes32",
              "indexed": true,
              "internalType": "bytes32"
            },
            {
              "name": "account",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "sender",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "Transfer",
          "inputs": [
            {
              "name": "from",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "to",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            },
            {
              "name": "amount",
              "type": "uint256",
              "indexed": false,
              "internalType": "uint256"
            }
          ],
          "anonymous": false
        },
        {
          "type": "event",
          "name": "Upgraded",
          "inputs": [
            {
              "name": "implementation",
              "type": "address",
              "indexed": true,
              "internalType": "address"
            }
          ],
          "anonymous": false
        },
        {
          "type": "error",
          "name": "AccessControlBadConfirmation",
          "inputs": []
        },
        {
          "type": "error",
          "name": "AccessControlUnauthorizedAccount",
          "inputs": [
            {
              "name": "account",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "neededRole",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        },
        {
          "type": "error",
          "name": "AddressEmptyCode",
          "inputs": [
            {
              "name": "target",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "AllowanceOverflow",
          "inputs": []
        },
        {
          "type": "error",
          "name": "AllowanceUnderflow",
          "inputs": []
        },
        {
          "type": "error",
          "name": "AmountOutOfRange",
          "inputs": []
        },
        {
          "type": "error",
          "name": "AssetIsBadCollateral",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "AssetIsNotBadCollateral",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "AssetNotRegistered",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "ERC1967InvalidImplementation",
          "inputs": [
            {
              "name": "implementation",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "ERC1967NonPayable",
          "inputs": []
        },
        {
          "type": "error",
          "name": "ExceedGlobalCap",
          "inputs": []
        },
        {
          "type": "error",
          "name": "ExceedRelativeCap",
          "inputs": []
        },
        {
          "type": "error",
          "name": "FailedCall",
          "inputs": []
        },
        {
          "type": "error",
          "name": "InsufficientAllowance",
          "inputs": []
        },
        {
          "type": "error",
          "name": "InsufficientAssets",
          "inputs": [
            {
              "name": "assets",
              "type": "uint256",
              "internalType": "uint256"
            },
            {
              "name": "shares",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "type": "error",
          "name": "InsufficientBalance",
          "inputs": []
        },
        {
          "type": "error",
          "name": "InsufficientRecapitalizeAmount",
          "inputs": [
            {
              "name": "amount",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "type": "error",
          "name": "InvalidInitialization",
          "inputs": []
        },
        {
          "type": "error",
          "name": "InvalidPermit",
          "inputs": []
        },
        {
          "type": "error",
          "name": "LiquidationDisabled",
          "inputs": []
        },
        {
          "type": "error",
          "name": "LiquidationWithReferenceCollateral",
          "inputs": []
        },
        {
          "type": "error",
          "name": "MismatchedOwner",
          "inputs": [
            {
              "name": "owner",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "expectedOwner",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "NotFactory",
          "inputs": []
        },
        {
          "type": "error",
          "name": "NotInitializing",
          "inputs": []
        },
        {
          "type": "error",
          "name": "NotPegged",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "OverOneHundredPercentRate",
          "inputs": [
            {
              "name": "rate",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "type": "error",
          "name": "PermitExpired",
          "inputs": []
        },
        {
          "type": "error",
          "name": "RecapitalizeNotNeeded",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "TotalSupplyOverflow",
          "inputs": []
        },
        {
          "type": "error",
          "name": "UUPSUnauthorizedCallContext",
          "inputs": []
        },
        {
          "type": "error",
          "name": "UUPSUnsupportedProxiableUUID",
          "inputs": [
            {
              "name": "slot",
              "type": "bytes32",
              "internalType": "bytes32"
            }
          ]
        },
        {
          "type": "error",
          "name": "UnauthorizedCaller",
          "inputs": [
            {
              "name": "caller",
              "type": "address",
              "internalType": "address"
            },
            {
              "name": "expectedCaller",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "UnderNinetyEightPercentRate",
          "inputs": [
            {
              "name": "rate",
              "type": "uint256",
              "internalType": "uint256"
            }
          ]
        },
        {
          "type": "error",
          "name": "UnexpectedBasketModeStatus",
          "inputs": []
        },
        {
          "type": "error",
          "name": "VaultAlreadyRegistered",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        },
        {
          "type": "error",
          "name": "VaultPaused",
          "inputs": []
        },
        {
          "type": "error",
          "name": "ZeroAddress",
          "inputs": []
        },
        {
          "type": "error",
          "name": "ZeroAmount",
          "inputs": []
        },
        {
          "type": "error",
          "name": "ZeroWeight",
          "inputs": [
            {
              "name": "asset",
              "type": "address",
              "internalType": "address"
            }
          ]
        }
      ]
] as const

export const reward_vault_abi = [
    {
        "type": "function",
        "name": "WETH",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "contract IWETH"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "batchSwap",
        "inputs": [
          {
            "name": "kind",
            "type": "uint8",
            "internalType": "enum IVault.SwapKind"
          },
          {
            "name": "swaps",
            "type": "tuple[]",
            "internalType": "struct IVault.BatchSwapStep[]",
            "components": [
              {
                "name": "poolId",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "assetInIndex",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "assetOutIndex",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "userData",
                "type": "bytes",
                "internalType": "bytes"
              }
            ]
          },
          {
            "name": "assets",
            "type": "address[]",
            "internalType": "contract IAsset[]"
          },
          {
            "name": "funds",
            "type": "tuple",
            "internalType": "struct IVault.FundManagement",
            "components": [
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "fromInternalBalance",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address payable"
              },
              {
                "name": "toInternalBalance",
                "type": "bool",
                "internalType": "bool"
              }
            ]
          },
          {
            "name": "limits",
            "type": "int256[]",
            "internalType": "int256[]"
          },
          {
            "name": "deadline",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "int256[]",
            "internalType": "int256[]"
          }
        ],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "deregisterTokens",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "internalType": "contract IERC20[]"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "exitPool",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "sender",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "recipient",
            "type": "address",
            "internalType": "address payable"
          },
          {
            "name": "request",
            "type": "tuple",
            "internalType": "struct IVault.ExitPoolRequest",
            "components": [
              {
                "name": "assets",
                "type": "address[]",
                "internalType": "contract IAsset[]"
              },
              {
                "name": "minAmountsOut",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "userData",
                "type": "bytes",
                "internalType": "bytes"
              },
              {
                "name": "toInternalBalance",
                "type": "bool",
                "internalType": "bool"
              }
            ]
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "flashLoan",
        "inputs": [
          {
            "name": "recipient",
            "type": "address",
            "internalType": "contract IFlashLoanRecipient"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "internalType": "contract IERC20[]"
          },
          {
            "name": "amounts",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "userData",
            "type": "bytes",
            "internalType": "bytes"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "getActionId",
        "inputs": [
          {
            "name": "selector",
            "type": "bytes4",
            "internalType": "bytes4"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getAuthorizer",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "contract IAuthorizer"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getDomainSeparator",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getInternalBalance",
        "inputs": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "internalType": "contract IERC20[]"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256[]",
            "internalType": "uint256[]"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getNextNonce",
        "inputs": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPausedState",
        "inputs": [],
        "outputs": [
          {
            "name": "paused",
            "type": "bool",
            "internalType": "bool"
          },
          {
            "name": "pauseWindowEndTime",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "bufferPeriodEndTime",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPool",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "",
            "type": "uint8",
            "internalType": "enum IVault.PoolSpecialization"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPoolTokenInfo",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "token",
            "type": "address",
            "internalType": "contract IERC20"
          }
        ],
        "outputs": [
          {
            "name": "cash",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "managed",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "lastChangeBlock",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "assetManager",
            "type": "address",
            "internalType": "address"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getPoolTokens",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "outputs": [
          {
            "name": "tokens",
            "type": "address[]",
            "internalType": "contract IERC20[]"
          },
          {
            "name": "balances",
            "type": "uint256[]",
            "internalType": "uint256[]"
          },
          {
            "name": "lastChangeBlock",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "getProtocolFeesCollector",
        "inputs": [],
        "outputs": [
          {
            "name": "",
            "type": "address",
            "internalType": "contract IProtocolFeesCollector"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "hasApprovedRelayer",
        "inputs": [
          {
            "name": "user",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "relayer",
            "type": "address",
            "internalType": "address"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "stateMutability": "view"
      },
      {
        "type": "function",
        "name": "joinPool",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "sender",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "recipient",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "request",
            "type": "tuple",
            "internalType": "struct IVault.JoinPoolRequest",
            "components": [
              {
                "name": "assets",
                "type": "address[]",
                "internalType": "contract IAsset[]"
              },
              {
                "name": "maxAmountsIn",
                "type": "uint256[]",
                "internalType": "uint256[]"
              },
              {
                "name": "userData",
                "type": "bytes",
                "internalType": "bytes"
              },
              {
                "name": "fromInternalBalance",
                "type": "bool",
                "internalType": "bool"
              }
            ]
          }
        ],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "managePoolBalance",
        "inputs": [
          {
            "name": "ops",
            "type": "tuple[]",
            "internalType": "struct IVault.PoolBalanceOp[]",
            "components": [
              {
                "name": "kind",
                "type": "uint8",
                "internalType": "enum IVault.PoolBalanceOpKind"
              },
              {
                "name": "poolId",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "token",
                "type": "address",
                "internalType": "contract IERC20"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              }
            ]
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "manageUserBalance",
        "inputs": [
          {
            "name": "ops",
            "type": "tuple[]",
            "internalType": "struct IVault.UserBalanceOp[]",
            "components": [
              {
                "name": "kind",
                "type": "uint8",
                "internalType": "enum IVault.UserBalanceOpKind"
              },
              {
                "name": "asset",
                "type": "address",
                "internalType": "contract IAsset"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address payable"
              }
            ]
          }
        ],
        "outputs": [],
        "stateMutability": "payable"
      },
      {
        "type": "function",
        "name": "queryBatchSwap",
        "inputs": [
          {
            "name": "kind",
            "type": "uint8",
            "internalType": "enum IVault.SwapKind"
          },
          {
            "name": "swaps",
            "type": "tuple[]",
            "internalType": "struct IVault.BatchSwapStep[]",
            "components": [
              {
                "name": "poolId",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "assetInIndex",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "assetOutIndex",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "userData",
                "type": "bytes",
                "internalType": "bytes"
              }
            ]
          },
          {
            "name": "assets",
            "type": "address[]",
            "internalType": "contract IAsset[]"
          },
          {
            "name": "funds",
            "type": "tuple",
            "internalType": "struct IVault.FundManagement",
            "components": [
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "fromInternalBalance",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address payable"
              },
              {
                "name": "toInternalBalance",
                "type": "bool",
                "internalType": "bool"
              }
            ]
          }
        ],
        "outputs": [
          {
            "name": "assetDeltas",
            "type": "int256[]",
            "internalType": "int256[]"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "registerPool",
        "inputs": [
          {
            "name": "specialization",
            "type": "uint8",
            "internalType": "enum IVault.PoolSpecialization"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "bytes32",
            "internalType": "bytes32"
          }
        ],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "registerTokens",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "internalType": "bytes32"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "internalType": "contract IERC20[]"
          },
          {
            "name": "assetManagers",
            "type": "address[]",
            "internalType": "address[]"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setAuthorizer",
        "inputs": [
          {
            "name": "newAuthorizer",
            "type": "address",
            "internalType": "contract IAuthorizer"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setPaused",
        "inputs": [
          {
            "name": "paused",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "setRelayerApproval",
        "inputs": [
          {
            "name": "sender",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "relayer",
            "type": "address",
            "internalType": "address"
          },
          {
            "name": "approved",
            "type": "bool",
            "internalType": "bool"
          }
        ],
        "outputs": [],
        "stateMutability": "nonpayable"
      },
      {
        "type": "function",
        "name": "swap",
        "inputs": [
          {
            "name": "singleSwap",
            "type": "tuple",
            "internalType": "struct IVault.SingleSwap",
            "components": [
              {
                "name": "poolId",
                "type": "bytes32",
                "internalType": "bytes32"
              },
              {
                "name": "kind",
                "type": "uint8",
                "internalType": "enum IVault.SwapKind"
              },
              {
                "name": "assetIn",
                "type": "address",
                "internalType": "contract IAsset"
              },
              {
                "name": "assetOut",
                "type": "address",
                "internalType": "contract IAsset"
              },
              {
                "name": "amount",
                "type": "uint256",
                "internalType": "uint256"
              },
              {
                "name": "userData",
                "type": "bytes",
                "internalType": "bytes"
              }
            ]
          },
          {
            "name": "funds",
            "type": "tuple",
            "internalType": "struct IVault.FundManagement",
            "components": [
              {
                "name": "sender",
                "type": "address",
                "internalType": "address"
              },
              {
                "name": "fromInternalBalance",
                "type": "bool",
                "internalType": "bool"
              },
              {
                "name": "recipient",
                "type": "address",
                "internalType": "address payable"
              },
              {
                "name": "toInternalBalance",
                "type": "bool",
                "internalType": "bool"
              }
            ]
          },
          {
            "name": "limit",
            "type": "uint256",
            "internalType": "uint256"
          },
          {
            "name": "deadline",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "outputs": [
          {
            "name": "",
            "type": "uint256",
            "internalType": "uint256"
          }
        ],
        "stateMutability": "payable"
      },
      {
        "type": "event",
        "name": "AuthorizerChanged",
        "inputs": [
          {
            "name": "newAuthorizer",
            "type": "address",
            "indexed": true,
            "internalType": "contract IAuthorizer"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "ExternalBalanceTransfer",
        "inputs": [
          {
            "name": "token",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "sender",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "recipient",
            "type": "address",
            "indexed": false,
            "internalType": "address"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "FlashLoan",
        "inputs": [
          {
            "name": "recipient",
            "type": "address",
            "indexed": true,
            "internalType": "contract IFlashLoanRecipient"
          },
          {
            "name": "token",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "amount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "feeAmount",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "InternalBalanceChanged",
        "inputs": [
          {
            "name": "user",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "token",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "delta",
            "type": "int256",
            "indexed": false,
            "internalType": "int256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "PausedStateChanged",
        "inputs": [
          {
            "name": "paused",
            "type": "bool",
            "indexed": false,
            "internalType": "bool"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "PoolBalanceChanged",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "liquidityProvider",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "indexed": false,
            "internalType": "contract IERC20[]"
          },
          {
            "name": "deltas",
            "type": "int256[]",
            "indexed": false,
            "internalType": "int256[]"
          },
          {
            "name": "protocolFeeAmounts",
            "type": "uint256[]",
            "indexed": false,
            "internalType": "uint256[]"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "PoolBalanceManaged",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "assetManager",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "token",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "cashDelta",
            "type": "int256",
            "indexed": false,
            "internalType": "int256"
          },
          {
            "name": "managedDelta",
            "type": "int256",
            "indexed": false,
            "internalType": "int256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "PoolRegistered",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "poolAddress",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "specialization",
            "type": "uint8",
            "indexed": false,
            "internalType": "enum IVault.PoolSpecialization"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "RelayerApprovalChanged",
        "inputs": [
          {
            "name": "relayer",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "sender",
            "type": "address",
            "indexed": true,
            "internalType": "address"
          },
          {
            "name": "approved",
            "type": "bool",
            "indexed": false,
            "internalType": "bool"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "Swap",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "tokenIn",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "tokenOut",
            "type": "address",
            "indexed": true,
            "internalType": "contract IERC20"
          },
          {
            "name": "amountIn",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          },
          {
            "name": "amountOut",
            "type": "uint256",
            "indexed": false,
            "internalType": "uint256"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "TokensDeregistered",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "indexed": false,
            "internalType": "contract IERC20[]"
          }
        ],
        "anonymous": false
      },
      {
        "type": "event",
        "name": "TokensRegistered",
        "inputs": [
          {
            "name": "poolId",
            "type": "bytes32",
            "indexed": true,
            "internalType": "bytes32"
          },
          {
            "name": "tokens",
            "type": "address[]",
            "indexed": false,
            "internalType": "contract IERC20[]"
          },
          {
            "name": "assetManagers",
            "type": "address[]",
            "indexed": false,
            "internalType": "address[]"
          }
        ],
        "anonymous": false
      }
] as const