// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

/**
 * @dev SwapHelper contract uses is a wrapper to a uniswap compatible DEX
        to convert any token to DAI.
 */
contract SwapHelper {

    // =============================================== Storage ========================================================

    /// @dev swapFactory is the preferred DEX factory contract to fetch pairs.
    address public swapFactory;

    /// @dev swapRouter is the preferred DEX router contract to perform trades.
    address public swapRouter;

    /// @dev WETH is the network native token wrapped.
    address public WETH;

    /// @dev DAI is the network preferred stable coin.
    address public DAI;

    // =============================================== Events ========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    /// @dev Constructor.
    /// @param swapFactory_ The address of the preferred DEX factory contract to fetch pairs.
    /// @param swapRouter_ The address of the preferred DEX router contract to perform trades.
    /// @param weth_ The address the network native token wrapped.
    /// @param dai_ The address of the network preferred stable coin.
    constructor(address swapFactory_, address swapRouter_, address weth_, address dai_) {
        swapFactory = swapFactory_;
        swapRouter = swapRouter_;
        WETH = weth_;
        DAI = dai_;
    }

    // =============================================== Getters ========================================================

}
