// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./BasePayment.sol";

/**
 * @dev RecurrentPayment is a contract for a payment.
 *      Deployed inside a POS this contract can be used multiple
 *      times.
 */
contract RecurrentPayment is Ownable, BasePayment {

    // =============================================== Storage ========================================================
    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(
        string memory id_,
        uint256 amount_,
        address registry_
    ) BasePayment(id_, amount_, registry_) {}

    // =============================================== Getters ========================================================
    // =============================================== Internal =======================================================

}
