const { ethers, upgrades } = require("hardhat");

async function main() {

    const TokensRegistry = await ethers.getContractFactory("TokensRegistry");
    const registry = await upgrades.deployProxy(TokensRegistry, [])
    await registry.deployed()

    console.log(registry.address)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });