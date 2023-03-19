# MultiSig Dapp using Nextjs/Reactjs, Ethersjs, Wagmi and WalletConnent

## Introduction

This Project is for the Development of a MultiSig Dapp that interact with the Smart Contract already deployed using the [sibling Repository](https://github.com/Aiseluck/MultiSig-Wallet-Project)

## Installation

1. Clone the repository

```bash
 git clone https://github.com/Aiseluck/MultiSig-Wallet-Dapp_Front_End_Project
```

2. Install Dependencies

```bash
 yarn install
```

## Usage

1.  create a `.env` file and add your `Wallet Connect API Key`. For Example

    ```javascript
    PROJECT_ID = "Your API Key goes in here";
    ```

2.  Update the `walletFactoryAddress variable` in the `utils/address.js` to the deployed Contract Address on your Desired Network and update the `chains variable` to the Desired Network

3.  Run command

    ```shell
    yarn next build
    yarn next export
    ```

4.  Serving on a Static CDN
    The `out` Directory would contain the SPA Static Output

## Live Project

You can check out he Live Project [here](https://multisigwallet.onrender.com/)

If you would like to connect with me [on Twitter](https://twitter.com/Aiseluck)
