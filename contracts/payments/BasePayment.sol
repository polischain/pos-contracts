// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev BasePayment is a contract with common functions for all payments.
 */
contract BasePayment is Ownable {

    // =============================================== Storage ========================================================

    bool public autoConvert;

    address public swapHelperContract;

    address public tokensRegistry;

    uint256 public payment;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(bool autoConvert_, address swapHelperContract_, address tokensRegistry_, uint256 payment_) {
        autoConvert = autoConvert_;
        swapHelperContract = swapHelperContract_;
        tokensRegistry = tokensRegistry_;
        payment = payment_;
    }


    // =============================================== Getters ========================================================
    // =============================================== Internal =======================================================

}
