require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-truffle5");
require('@nomiclabs/hardhat-ethers');
require('dotenv').config()

const key = process.env.PRIVATE_KEY
const mainnet = process.env.MAINNET

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {
            chainId: 56,
            blockGasLimit: 12450000,
            forking: {
                url: "https://bsc-dataseed1.ninicoin.io/",
            },
        },
    },
    solidity: {
        compilers: [
            {version: "0.7.2",
                settings: {
                    optimizer: {
                        enabled: true,
                        runs: 200
                    }
                }},
        ]
    },
    mocha: {
        timeout: 2000000
    }
};