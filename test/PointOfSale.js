const { expect } = require("chai");
const PointOfSale = artifacts.require("PointOfSale");
const ForceSend = artifacts.require('ForceSend');

let erc20_abi = [{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegator","type":"address"},{"indexed":true,"internalType":"address","name":"fromDelegate","type":"address"},{"indexed":true,"internalType":"address","name":"toDelegate","type":"address"}],"name":"DelegateChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"delegate","type":"address"},{"indexed":false,"internalType":"uint256","name":"previousBalance","type":"uint256"},{"indexed":false,"internalType":"uint256","name":"newBalance","type":"uint256"}],"name":"DelegateVotesChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[],"name":"DELEGATION_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"DOMAIN_TYPEHASH","outputs":[{"internalType":"bytes32","name":"","type":"bytes32"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"},{"internalType":"uint32","name":"","type":"uint32"}],"name":"checkpoints","outputs":[{"internalType":"uint32","name":"fromBlock","type":"uint32"},{"internalType":"uint256","name":"votes","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"}],"name":"delegate","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegatee","type":"address"},{"internalType":"uint256","name":"nonce","type":"uint256"},{"internalType":"uint256","name":"expiry","type":"uint256"},{"internalType":"uint8","name":"v","type":"uint8"},{"internalType":"bytes32","name":"r","type":"bytes32"},{"internalType":"bytes32","name":"s","type":"bytes32"}],"name":"delegateBySig","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"delegator","type":"address"}],"name":"delegates","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"getCurrentVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"getOwner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"blockNumber","type":"uint256"}],"name":"getPriorVotes","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"_amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"numCheckpoints","outputs":[{"internalType":"uint32","name":"","type":"uint32"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"address","name":"recipient","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"}]
let weth_abi = [{"constant":true,"inputs":[],"name":"name","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"guy","type":"address"},{"name":"wad","type":"uint256"}],"name":"approve","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"totalSupply","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"src","type":"address"},{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transferFrom","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[{"name":"wad","type":"uint256"}],"name":"withdraw","outputs":[],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":true,"inputs":[],"name":"decimals","outputs":[{"name":"","type":"uint8"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"}],"name":"balanceOf","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":true,"inputs":[],"name":"symbol","outputs":[{"name":"","type":"string"}],"payable":false,"stateMutability":"view","type":"function"},{"constant":false,"inputs":[{"name":"dst","type":"address"},{"name":"wad","type":"uint256"}],"name":"transfer","outputs":[{"name":"","type":"bool"}],"payable":false,"stateMutability":"nonpayable","type":"function"},{"constant":false,"inputs":[],"name":"deposit","outputs":[],"payable":true,"stateMutability":"payable","type":"function"},{"constant":true,"inputs":[{"name":"","type":"address"},{"name":"","type":"address"}],"name":"allowance","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"view","type":"function"},{"payable":true,"stateMutability":"payable","type":"fallback"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"guy","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"dst","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Deposit","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"name":"src","type":"address"},{"indexed":false,"name":"wad","type":"uint256"}],"name":"Withdrawal","type":"event"}]

const router = "0x10ed43c718714eb63d5aa57b78b54704e256024e";
const factory = "0xBCfCcbde45cE874adCB698cC183deBcF17952812";
const dai = "0x1af3f329e8be154074d8769d1ffa4ee058b1dbc3";
const dai_owner = "0xf68a4b64162906eff0ff6ae34e2bb1cd42fef62d"
const polis = "0xb5bea8a26d587cf665f2d78f077cca3c7f6341bd";
const polis_owner = "0x036db579ca9a04fa676cefac9db6f83ab7fbaad7";
const weth = "0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c";
const cake = "0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82";
const cake_owner = "0x73feaa1ee314f8c655e354234017be2193c9e24e";
const safe_moon = "0x8076c74c5e3f5852037f31ff0093eeb8c8add8d3";

let products = [
    {
        id: "1",
        image: "image-1",
        price: web3.utils.toWei("10", "ether"),
        available: true,
    },
    {
        id: "2",
        image: "image-2",
        price: web3.utils.toWei("5", "ether"),
        available: true,
    },
    {
        id: "3",
        image: "image-3",
        price: web3.utils.toWei("2", "ether"),
        available: true,
    },
    {
        id: "4",
        image: "image-4",
        price: web3.utils.toWei("1", "ether"),
        available: true,
    },
    {
        id: "5",
        image: "image-5",
        price: web3.utils.toWei("1.5", "ether"),
        available: true,
    }
]

let shop;
let deployer;
before(async function() {
    await impersonates([dai_owner, polis_owner, cake_owner, safe_moon])

    let accounts = await web3.eth.getAccounts();
    deployer = accounts[0];
    shop = await PointOfSale.new(router, factory, dai, polis, weth, {from: deployer})

    // Mint balances to deployer:

    // 1000 DAI

    let forceSendDAI = await ForceSend.new();
    await forceSendDAI.go(dai_owner, { from: deployer, value: web3.utils.toWei('1', "ether") });

    let daiContract = new web3.eth.Contract(erc20_abi, dai);
    await daiContract.methods.mint("1000000000000000000000").send({from: dai_owner})
    await daiContract.methods.transfer(deployer, "1000000000000000000000").send({from: dai_owner})

    let daiBalance = await daiContract.methods.balanceOf(deployer).call()

    console.log("DAI Balance:", daiBalance)

    // 1 WETH
    let wethContract = new web3.eth.Contract(weth_abi, weth);
    await wethContract.methods.deposit().send({from: deployer, value: web3.utils.toWei("1", "ether")})

    let wethBalance = await wethContract.methods.balanceOf(deployer).call()

    console.log("WETH Balance:", wethBalance)

    // 1000 POLIS

    const forceSendPolis = await ForceSend.new();
    await forceSendPolis.go(polis_owner, { from: deployer, value: web3.utils.toWei('1', "ether") });

    let polisContract = new web3.eth.Contract(erc20_abi, polis);
    await polisContract.methods.mint(deployer, "1000000000000000000000").send({from: polis_owner})

    let polisBalance = await polisContract.methods.balanceOf(deployer).call()

    console.log("POLIS Balance: ", polisBalance)


    // 5000000000 SafeMoon
    const forceSendSafeMoon = await ForceSend.new();
    await forceSendSafeMoon.go(safe_moon, { from: deployer, value: web3.utils.toWei('1', "ether") });

    let safeMoonContract = new web3.eth.Contract(erc20_abi, safe_moon);
    await safeMoonContract.methods.transfer(deployer, "500000000000000000").send({from: safe_moon})

    let safeMoonBalance = await safeMoonContract.methods.balanceOf(deployer).call()
    console.log("SafeMoon Balance: ", safeMoonBalance)

    // 1000 Cake
    const forceSendCake = await ForceSend.new();
    await forceSendCake.go(cake_owner, { from: deployer, value: web3.utils.toWei('1', "ether") });

    let cakeContract = new web3.eth.Contract(erc20_abi, cake);
    await cakeContract.methods.mint("1000000000000000000000").send({from: cake_owner})
    await cakeContract.methods.transfer(deployer, "1000000000000000000000").send({from: cake_owner})

    let cakeBalance = await cakeContract.methods.balanceOf(deployer).call()

    console.log("Cake Balance: ", cakeBalance)

    console.log("Approve shop to spend tokens")
    await daiContract.methods.approve(shop.address, "1000000000000000000000000000000000000").send({from: deployer})
    await wethContract.methods.approve(shop.address, "1000000000000000000000000000000000000").send({from: deployer})
    await polisContract.methods.approve(shop.address, "1000000000000000000000000000000000000").send({from: deployer})
    await safeMoonContract.methods.approve(shop.address, "1000000000000000000000000000000000000").send({from: deployer})
    await cakeContract.methods.approve(shop.address, "1000000000000000000000000000000000000").send({from: deployer})
});

describe("PointOfSale Test", () => {
    it("Should initialize the contract", async () => {
        let initialized = await shop.initialized()
        expect(initialized).to.eq(false);

        await shop.setInitialize(true);

        initialized = await shop.initialized()
        expect(initialized).to.eq(true);
    });

    it("Check initial fees and modify them", async () => {
        let fee = await shop.fee()
        let feePrefToken = await shop.feeForPrefToken()
        expect(fee.toNumber()).to.eq(4);
        expect(feePrefToken.toNumber()).to.eq(3);

        await shop.setFee(5)
        await shop.setFeeForPrefToken(5)

        fee = await shop.fee()
        feePrefToken = await shop.feeForPrefToken()
        expect(fee.toNumber()).to.eq(5);
        expect(feePrefToken.toNumber()).to.eq(5);

        await shop.setFee(4)
        await shop.setFeeForPrefToken(3)
    });

    it("Register a user", async () => {
        // Check for user information (should be null)
        let user = await shop.getUserHash(deployer);
        expect(user).to.eq("0x0000000000000000000000000000000000000000000000000000000000000000");

        // Register user email
        await shop.register("a@a.com")

        // Check hash
        user = await shop.getUserHash(deployer);
        expect(user).to.eq("0x3d7ca65eb1eb8271f566c18ff1873eef0ea7c873943b1cf1c70ebde876adeabc");

        // Make sure the utility function is the same
        let emailHash = await shop.getEmailHash("a@a.com")
        expect(emailHash).to.eq("0x3d7ca65eb1eb8271f566c18ff1873eef0ea7c873943b1cf1c70ebde876adeabc");

        // Override
        await shop.register("a@ab.com")

        // Check new hash
        user = await shop.getUserHash(deployer);
        expect(user).to.eq("0x3dad15ffa9129b4c2f77598296fefcabc68b118f8325e8cdf4aeae7f8f6c4a71");

        emailHash = await shop.getEmailHash("a@ab.com")
        expect(emailHash).to.eq("0x3dad15ffa9129b4c2f77598296fefcabc68b118f8325e8cdf4aeae7f8f6c4a71");
    });

    it("Check and set buyBackAndBurn", async () => {
        let buyback = await shop.buyBackAndBurn()
        expect(buyback).to.eq(false);

        await shop.setBuyBackAndBurn(true);

        buyback = await shop.buyBackAndBurn()
        expect(buyback).to.eq(true);
    });

    it("Add and override products", async () => {
        await shop.addBulkProducts(products);

        let product = await shop.getProduct(products[0].id);
        expect(product.image).to.eq(products[0].image);
        expect(product.price).to.eq(products[0].price);

        let list = await shop.getProductsList()
        for (let i = 0; i < list; i++) {
            expect(list[i].toNumber()).to.eq(products[i].id);
        }

        let newProduct = {
                id: "1",
                image: "image-1",
                price: "15",
                available: true,
        }

        await shop.addProduct(newProduct);

        product = await shop.getProduct(products[0].id);
        expect(product.price).to.eq("15");

        list = await shop.getProductsList()
        expect(list.length).to.eq(5)

        await shop.addProduct(products[0]);
    });

    it("Check product prices on charge tokens", async () => {
        let price1 = await shop.getProductPrice("1");
        expect(price1.toString()).to.eq(web3.utils.toWei("10", "ether"))

        let price2 = await shop.getProductPrice("2");
        expect(price2.toString()).to.eq(web3.utils.toWei("5", "ether"))

        let price3 = await shop.getProductPrice("3");
        expect(price3.toString()).to.eq(web3.utils.toWei("2", "ether"))

        let price4 = await shop.getProductPrice("4");
        expect(price4.toString()).to.eq(web3.utils.toWei("1", "ether"))

        let price5 = await shop.getProductPrice("5");
        expect(price5.toString()).to.eq(web3.utils.toWei("1.5", "ether"))
    });

    it("Check prices for custom products calculating slippage and fees", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;

        let priceWithFeeForPrefToken = priceNum * 1.03;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");
        let expectedPriceWithFeeUsingPrefToken = web3.utils.toWei(priceWithFeeForPrefToken.toString(), "ether");

        let pricesChargeToken = await shop.getProductPricesOnSpecificTokenForCustomOrder(price, dai, 1)
        expect(pricesChargeToken[0].toString()).to.eq(expectedPriceWithFee.toString());
        expect(pricesChargeToken[1].toString()).to.eq("0");

        let pricesWETH = await shop.getProductPricesOnSpecificTokenForCustomOrder(price, weth, 1)
        expect(pricesWETH[0].toString()).to.eq(expectedPriceWithFee.toString());

        let pricesCake = await shop.getProductPricesOnSpecificTokenForCustomOrder(price, cake, 1)
        expect(pricesCake[0].toString()).to.eq(expectedPriceWithFee.toString());

        let pricesSafeMoon = await shop.getProductPricesOnSpecificTokenForCustomOrder(price, safe_moon, 15)
        expect(pricesSafeMoon[0].toString()).to.eq(expectedPriceWithFee.toString());

        let pricesPrefToken = await shop.getProductPricesOnSpecificTokenForCustomOrder(price, polis, 1)
        expect(pricesPrefToken[0].toString()).to.eq(expectedPriceWithFeeUsingPrefToken.toString());
    })

    it("Buy custom products using DAI without buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buyCustomOrder(1, dai, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Buy custom products using DAI with buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buyCustomOrder(1, dai, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Buy custom products using WETH without buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buyCustomOrder(1, weth, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Buy custom products using WETH with buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buyCustomOrder(1, weth, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Buy custom products using PrefToken without buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithPrefFee = priceNum * 1.03;
        let expectedPriceWithPrefFee = web3.utils.toWei(priceWithPrefFee.toString(), "ether");

        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buyCustomOrder(1, polis, 2, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithPrefFee)
    });

    it("Buy custom products using PrefToken with buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithPrefFee = priceNum * 1.03;
        let expectedPriceWithPrefFee = web3.utils.toWei(priceWithPrefFee.toString(), "ether");

        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buyCustomOrder(1, polis, 2, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithPrefFee)
    });

    it("Buy custom products using a random token with low slippage without buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buyCustomOrder(1, cake, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Buy custom products using a random token with low slippage with buyBackAndBurn", async () => {
        const price = web3.utils.toWei("10", "ether")
        let priceNum = parseInt(price) / 1e18;
        let priceWithFee = priceNum * 1.04;
        let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");

        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buyCustomOrder(1, cake, 1, price);
        expect(tx.logs[0].event).to.eq("PurchaseCustomOrder")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.orderId.toNumber()).to.eq(1)
        expect(tx.logs[0].args.payed_price.toString()).to.eq(expectedPriceWithFee)
    });

    it("Check product prices calculating slippage and fees", async () => {
        for (let i = 1; i <=5; i++) {
            let priceNum = parseInt(products[i-1].price) / 1e18;
            let priceWithFee = priceNum * 1.04;
            let priceWithFeeForPrefToken = priceNum * 1.03;
            let expectedPriceWithFee = web3.utils.toWei(priceWithFee.toString(), "ether");
            let expectedPriceWithFeeUsingPrefToken = web3.utils.toWei(priceWithFeeForPrefToken.toString(), "ether");

            let pricesChargeToken = await shop.getProductPricesOnSpecificToken(i, dai, 1)
            expect(pricesChargeToken[0].toString()).to.eq(expectedPriceWithFee.toString());
            expect(pricesChargeToken[1].toString()).to.eq("0");
            expect(pricesChargeToken[2].toString()).to.eq("0");

            let pricesWETH = await shop.getProductPricesOnSpecificToken(i, weth, 1)
            expect(pricesWETH[0].toString()).to.eq(expectedPriceWithFee.toString());
            expect(pricesWETH[2].toString()).to.eq("0");

            let pricesPrefToken = await shop.getProductPricesOnSpecificToken(i, polis, 1)
            expect(pricesPrefToken[0].toString()).to.eq(expectedPriceWithFeeUsingPrefToken.toString());

            let pricesCake = await shop.getProductPricesOnSpecificToken(i, cake, 1)
            expect(pricesCake[0].toString()).to.eq(expectedPriceWithFee.toString());
            expect(pricesCake[1].toString()).to.eq(pricesWETH[1].toString());

            let pricesSafeMoon = await shop.getProductPricesOnSpecificToken(i, safe_moon, 15)
            expect(pricesSafeMoon[0].toString()).to.eq(expectedPriceWithFee.toString());

            // The following price checks can't be done automatically.
            // Printing logs to manual verify
            console.log("Product", i, "prices:")
            console.log("WETH Price", web3.utils.fromWei(pricesWETH[1].toString(), "ether"))
            console.log("WETH Price using PrefToken", web3.utils.fromWei(pricesPrefToken[1].toString(), "ether"))
            console.log("Cake Price", web3.utils.fromWei(pricesCake[2].toString(), "ether"))
            console.log("SafeMoon Price", web3.utils.fromWei(pricesSafeMoon[2].toString(), "gwei"))
            console.log("Polis Price", web3.utils.fromWei(pricesPrefToken[2].toString(), "ether"))
        }
    })

   it("Buy using DAI without buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buy(1, dai, 1);
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    it("Buy using DAI with buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buy(1, dai, 1)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

   it("Buy using WETH without buyBackAndBurn", async () => {
       await shop.setBuyBackAndBurn(false)
       let tx = await shop.buy(1, weth, 1)
       expect(tx.logs[0].event).to.eq("Purchase")
       expect(tx.logs[0].args.addr).to.eq(deployer)
       expect(tx.logs[0].args.product.toNumber()).to.eq(1)
   });

   it("Buy using WETH with buyBackAndBurn", async () => {
       await shop.setBuyBackAndBurn(true)
       let tx = await shop.buy(1, weth, 1)
       expect(tx.logs[0].event).to.eq("Purchase")
       expect(tx.logs[0].args.addr).to.eq(deployer)
       expect(tx.logs[0].args.product.toNumber()).to.eq(1)
   });

    it("Buy using a random token with normal slippage without buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buy(1, cake, 1)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    it("Buy using a random token with normal slippage with buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buy(1, cake, 1)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    it("Buy using PrefToken without buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buy(1, polis, 2)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    it("Buy using PrefToken with buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buy(1, polis, 2)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    // TODO fix
    /*it("Buy using a random token with high slippage and fee on transfer without buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(false)
        let tx = await shop.buy(1, safe_moon, 15)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });

    it("Buy using a random token with high slippage and fee on transfer with buyBackAndBurn", async () => {
        await shop.setBuyBackAndBurn(true)
        let tx = await shop.buy(1, safe_moon, 15)
        expect(tx.logs[0].event).to.eq("Purchase")
        expect(tx.logs[0].args.addr).to.eq(deployer)
        expect(tx.logs[0].args.product.toNumber()).to.eq(1)
    });*/

    it("Load user purchase history", async () => {
        let history = await shop.getUserHistory()
        expect(history.length).to.eq(8);
    });

    it("Claim tokens", async () => {
        await shop.claim()
    });

});

async function impersonates(targetAccounts) {
    console.log("Impersonating...");
    for(let i = 0; i < targetAccounts.length ; i++){
        await hre.network.provider.request({
            method: "hardhat_impersonateAccount",
            params: [
                targetAccounts[i]
            ]
        });
    }
}