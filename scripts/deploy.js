const { ethers } = require("hardhat");

async function main() {

    const TokensRegistry = await ethers.getContractFactory("TokensRegistry");

    const registry = await TokensRegistry.deploy()
    await registry.deployed()

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });