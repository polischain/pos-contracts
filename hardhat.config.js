require('@nomiclabs/hardhat-ethers');
require('dotenv').config()

const key = process.env.PRIVATE_KEY

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
    },
    solidity: {
        compilers: [{
            version: "0.8.7",
            settings: {
                optimizer: {
                    enabled: true,
                    runs: 200
                }
            }
        }, ]
    },
    mocha: {
        timeout: 2000000
    }
};