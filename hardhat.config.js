require("@nomiclabs/hardhat-waffle");
require('@openzeppelin/hardhat-upgrades');

require('dotenv').config()

let private_key = process.env.PRIVATE_KEY;

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
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