require("@nomiclabs/hardhat-waffle");
require('dotenv').config()

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