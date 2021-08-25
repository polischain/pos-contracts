const { expect } = require('chai');
const { ethers } = require("hardhat")
const routerABI = require("@uniswap/v2-periphery/build/UniswapV2Router02.json")
const factoryABI = require("@uniswap/v2-core/build/UniswapV2Factory.json")
const pairABI = require("@uniswap/v2-core/build/UniswapV2Pair.json")

const ROUTER = "0x50db5A60009f655f59703d2266819491a977634d"
const WETH = "0xC614405267eCDbF01FB5b425e3F2EC657160101A"
const FACTORY = "0x6f032f18330029345fD34C925c1154BBDce6567E"

describe('SwapHelper', () => {

    before(async () => {

        const [owner] = await ethers.getSigners()
        const MockToken = await ethers.getContractFactory("MockToken");
        const SwapHelper = await ethers.getContractFactory("SwapHelper");

        const router = new ethers.Contract(ROUTER, routerABI.abi, owner)
        const factory = new ethers.Contract(FACTORY, factoryABI.abi, owner)

        // Deploy a Mock for DAI
        this.dai = await MockToken.deploy("MockDAI", "MockDAI", "200000000000000000000000")
        await this.dai.deployed()

        // Deploy a Mock Token
        this.token = await MockToken.deploy("MockToken", "MockToken", "200000000000000000000000")
        await this.token.deployed()

        // Approve Router
        await this.dai.approve(ROUTER, "100000000000000000000000000000")
        await this.token.approve(ROUTER, "100000000000000000000000000000")

        // Create the Token/DAI Pair
        // Proportion is 1:1
        await router.addLiquidity(this.token.address, this.dai.address, "100000000000000000000000", "100000000000000000000000", "100000000000000000000000", "100000000000000000000000", owner.address, Date.now() + 5000)
        
        // Create the Token/WETH Pair
        // Proportion is 1000:1
        await router.addLiquidityETH(this.token.address, "100000000000000000000000", "100000000000000000000000", "100000000000000000000", owner.address, Date.now() + 5000, {value: "100000000000000000000"})

        // Create the DAI/WETH Pair
        // Proportion is 1000:1
        await router.addLiquidityETH(this.dai.address, "100000000000000000000000", "100000000000000000000000", "100000000000000000000", owner.address, Date.now() + 5000, {value: "100000000000000000000"})

        // Create the Token/DAI Pair
        // Proportion is 1:1
        const pair_dai = await factory.getPair(this.dai.address, this.token.address)
        this.pairDAI = new ethers.Contract(pair_dai, pairABI.abi, owner)

        // Create the Token/WETH Pair
        // Proportion is 1000:1
        const pair_weth = await factory.getPair(WETH, this.token.address)
        this.pairWETH = new ethers.Contract(pair_weth, pairABI.abi, owner)

        const pair_weth_dai = await factory.getPair(WETH, this.dai.address)

        this.swap = await SwapHelper.deploy(ROUTER, pair_weth_dai)
        await this.swap.deployed()
    });

    it('should fetch the correct price', async () => {
        const prices = ["5", "15", "100", "1.5", "12.12345"];

        for (let price of prices) {
            let wei = ethers.utils.parseEther(price)
            let tokenAmountUsingDAI = await this.swap.getTokenAmount(this.pairDAI.address, wei, 2, false);
            let tokenAmountUsingWETH = await this.swap.getTokenAmount(this.pairWETH.address, wei, 2, true);
            console.log(tokenAmountUsingDAI.toString(), tokenAmountUsingWETH.toString())
        }
    
    });

});