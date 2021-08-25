// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@uniswap/v2-core/contracts/interfaces/IUniswapV2Pair.sol";

/**
 * @dev SwapHelper is a wrapper around UniSwap based DEX to submit trades.
 */
contract SwapHelper is Ownable {

    // =============================================== Storage ========================================================

    /// @dev Contract address of the DEX router.
    address public router;

    /// @dev Pair of WETH/DAI for the DEX.
    address public WETH_DAI_PAIR;

    // =============================================== Setters =========================================================

    /// @dev Constructor.
    /// @param _router The contract address of the DEX router.
    /// @param _weth_dai_pair The contract address of the WETH/DAI pair on the DEX.
    constructor(address _router, address _weth_dai_pair) {
        router = _router;
        WETH_DAI_PAIR = _weth_dai_pair;
    }

    // =============================================== Getters ========================================================

    /// @dev Calculates the amount of tokens required to fulfill the `daiPrice`.
    /// @param pair The address of the trade pair.
    //  @param daiPrice The amount of DAI that needs to be fulfilled.
    //  @param slippage percentage of variation of token price.
    function getTokenAmount(address pair, uint256 daiPrice, uint256 slippage, bool isWETH) public view returns (uint256) {
        require(pair != address(0), "SwapHelper: pair cannot be empty");
        require(daiPrice > 0, "SwapHelper: daiPrice should be more than 0");
        if (isWETH) {
            return _calcTokenAmountWETH(pair, daiPrice, slippage);
        } else {
            return _calcTokenAmount(pair, daiPrice, slippage);
        }
    }

    // =============================================== Internal ========================================================

    /// @dev Calculates the amount of tokens required to fulfill the `daiPrice`.
    /// @param pair The address of the trade pair (it assumes it is token/DAI pair)
    //  @param daiPrice The amount of DAI that needs to be fulfilled.
    //  @param slippage percentage of variation of token price.
    function _calcTokenAmount(address pair, uint256 daiPrice, uint256 slippage) internal view returns (uint256) {
        (uint112 tokenReserves, uint112 daiTokenReserves,) = IUniswapV2Pair(pair).getReserves();
        uint256 tokenPrice = daiPrice * (tokenReserves / daiTokenReserves);
        return tokenPrice + ((tokenPrice * slippage) / 100);
    }

    /// @dev Calculates the amount of tokens required to fulfill the `daiPrice` using token/weth as the pair.
    /// @param pair The address of the trade pair (it assumes it is token/WETH pair)
    //  @param daiPrice The amount of DAI that needs to be fulfilled.
    //  @param slippage percentage of variation of token price.
    function _calcTokenAmountWETH(address pair, uint256 daiPrice, uint256 slippage) internal view returns (uint256) {
        (uint112 tokenReserves, uint112 wethTokenReserves,) = IUniswapV2Pair(pair).getReserves();
        uint256 tokenPrice = (daiPrice * _daiToWETH()) * (tokenReserves / wethTokenReserves);
        return tokenPrice + ((tokenPrice * slippage) / 100);
    }

    /// @dev Returns the amount of WETH required to buy DAI.
    function _daiToWETH() internal view returns (uint256) {
        (uint112 daiReserves, uint112 wethReserves,) = IUniswapV2Pair(WETH_DAI_PAIR).getReserves();
        return daiReserves / wethReserves ;
    }

}
