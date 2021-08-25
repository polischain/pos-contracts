require("@nomiclabs/hardhat-waffle");

require('dotenv').config()

let private_key = process.env.PRIVATE_KEY;

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 333888,
            blockGasLimit: 20000000,
            forking: {
                url: "https://sparta-rpc.polis.tech",
            },
        },
        sparta: {
            chainId: 333888,
            gasPrice: 1000000000,
            url: "https://sparta-rpc.polis.tech",
            accounts: [private_key]
        }
    },
    solidity: {
        compilers: [{
            version: "0.8.4",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }]
    },
    mocha: {
        timeout: 2000000
    }
};