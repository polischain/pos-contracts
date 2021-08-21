// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./BasePayment.sol";

/**
 * @dev SinglePayment is a contract for a single payment usage.
 *      Deployed inside a POS this contract is blocked once the
 *      first payment is done and will emit just a `SinglePaymentPaid` event
 */
contract SinglePayment is Ownable, BasePayment {

    // =============================================== Storage ========================================================

    bool public used;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(
        bool autoConvert_,
        address swapHelperContract,
        address tokensRegistry_,
        uint256 payment_
    ) BasePayment(autoConvert_, swapHelperContract, tokensRegistry_, payment_) {}

    // =============================================== Getters ========================================================
    // =============================================== Internal =======================================================

}
