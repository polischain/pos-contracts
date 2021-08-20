const { expect } = require('chai');
const { ethers } = require("hardhat")

describe('TokensRegistry', () => {

    before(async () => {
        const TokensRegistry = await ethers.getContractFactory("TokensRegistry");
        this.registry = await TokensRegistry.deploy();
        await this.registry.deployed();
    });

    it('should check initial tokens', async () => {
        const tokens = await this.registry.getSupportedTokens();
        expect(tokens).to.be.empty
    });

    it('should add a new token', async () => {
        await expect(this.registry.addToken("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"))
            .to.emit(this.registry, "TokenAdded")
            .withArgs("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")

        const tokens = await this.registry.getSupportedTokens();
        expect(tokens).to.include("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
    });

    it('should pause a token', async () => {
        await expect(this.registry.pauseToken("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"))
            .to.emit(this.registry, "TokenPaused")
            .withArgs("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
    });

    it('should resume a token', async () => {
        await expect(this.registry.resumeToken("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"))
            .to.emit(this.registry, "TokenResumed")
            .withArgs("0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2")
    });

});