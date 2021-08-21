// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./BasePayment.sol";

/**
 * @dev SubscriptionPayment is a contract for subscription payments.
 *      Deployed inside a POS this contract will charge the subscribed
 *      users each times it is called as long as payment periodicity is passed.
 */
contract SubscriptionPayment is Ownable, BasePayment {

    // =============================================== Storage ========================================================

    uint256 public periodicity;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(
        uint256 periodicity_,
        bool autoConvert_,
        address swapHelperContract,
        address tokensRegistry_,
        uint256 payment_
    ) BasePayment(autoConvert_, swapHelperContract, tokensRegistry_, payment_) {
        periodicity = periodicity_;
    }

    // =============================================== Getters ========================================================
    // =============================================== Internal =======================================================

}
