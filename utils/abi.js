export default abi = {
  walletFactory: [
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "string",
          name: "walletName",
          type: "string",
        },
        {
          indexed: true,
          internalType: "address",
          name: "walletAddress",
          type: "address",
        },
      ],
      name: "WalletDeployed",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "_walletName",
          type: "string",
        },
        {
          internalType: "address[]",
          name: "_owners",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "_numConfirmationsRequired",
          type: "uint256",
        },
      ],
      name: "createWallet",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "string",
          name: "",
          type: "string",
        },
      ],
      name: "deployedWallets",
      outputs: [
        {
          internalType: "contract MutiSigWallet",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
  ],
  multiSigWallet: [
    {
      inputs: [
        {
          internalType: "address[]",
          name: "_owners",
          type: "address[]",
        },
        {
          internalType: "uint256",
          name: "_numConfirmationsRequired",
          type: "uint256",
        },
      ],
      stateMutability: "nonpayable",
      type: "constructor",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "txNounce",
          type: "uint256",
        },
      ],
      name: "AuthorizeTransaction",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "txNounce",
          type: "uint256",
        },
        {
          indexed: true,
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
      ],
      name: "CreateTransaction",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "sender",
          type: "address",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "amount",
          type: "uint256",
        },
        {
          indexed: false,
          internalType: "uint256",
          name: "balance",
          type: "uint256",
        },
      ],
      name: "EthReceived",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "txNounce",
          type: "uint256",
        },
      ],
      name: "ExecuteTransaction",
      type: "event",
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: "address",
          name: "owner",
          type: "address",
        },
        {
          indexed: true,
          internalType: "uint256",
          name: "txNounce",
          type: "uint256",
        },
      ],
      name: "RevokeAuthorization",
      type: "event",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_txNounce",
          type: "uint256",
        },
      ],
      name: "authorizeTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "address",
          name: "_to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "_value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "_data",
          type: "bytes",
        },
      ],
      name: "createTransaction",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_txNounce",
          type: "uint256",
        },
      ],
      name: "executeTransaction",
      outputs: [],
      stateMutability: "nonpayable",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "_txNounce",
          type: "uint256",
        },
      ],
      name: "getTransactionDetails",
      outputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "bool",
          name: "executed",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "numAuthorization",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [],
      name: "numAuthorizationRequired",
      outputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      name: "ownerHasConfrimed",
      outputs: [
        {
          internalType: "bool",
          name: "",
          type: "bool",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "owners",
      outputs: [
        {
          internalType: "address",
          name: "",
          type: "address",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      inputs: [
        {
          internalType: "uint256",
          name: "",
          type: "uint256",
        },
      ],
      name: "transactions",
      outputs: [
        {
          internalType: "address",
          name: "to",
          type: "address",
        },
        {
          internalType: "uint256",
          name: "value",
          type: "uint256",
        },
        {
          internalType: "bytes",
          name: "data",
          type: "bytes",
        },
        {
          internalType: "bool",
          name: "executed",
          type: "bool",
        },
        {
          internalType: "uint256",
          name: "numAuthorization",
          type: "uint256",
        },
      ],
      stateMutability: "view",
      type: "function",
    },
    {
      stateMutability: "payable",
      type: "receive",
    },
  ],
};
