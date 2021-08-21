const { ethers, upgrades } = require("hardhat");

async function main() {

    const TokensRegistry = await ethers.getContractFactory("TokensRegistry");
    const SwapHelper = await ethers.getContractFactory("SwapHelper");
    const Factory = await ethers.getContractFactory("Factory");

    const registry = await TokensRegistry.deploy()
    await registry.deployed()

    const swap = await SwapHelper.deploy()
    await swap.deployed()

    const factory = await Factory.deploy(swap.address, registry.address)
    await factory.deployed()

}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });