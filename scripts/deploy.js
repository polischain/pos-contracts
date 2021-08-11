const Shop = artifacts.require("Shop");
const hre = require("hardhat");

const networks = {
    "hardhat": {
        router: "0x10ED43C718714eb63d5aA57B78B54704E256024E",   // Pancake Router
        factory: "0xBCfCcbde45cE874adCB698cC183deBcF17952812",  // Pancake Factory
        dai: "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3",
        polis: "0xb5bEa8a26D587CF665f2d78f077CcA3C7f6341BD",
        weth: "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c"
    },
}



async function main() {
    const [deployer] = await ethers.getSigners();
    const network = hre.network.name;

    console.log(
        "Deploying contracts with the account:",
        deployer.address,
        "on network:",
        network
    );

    let s = await Shop.new(networks[network].router, networks[network].factory, networks[network].dai, networks[network].polis, networks[network].weth, {from: deployer.address})
    console.log("Store deployed to:", s.address);
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });