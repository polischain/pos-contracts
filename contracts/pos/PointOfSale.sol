// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev PointOfSale is the contract to submit payments.
 */
contract PointOfSale is Ownable {

    // =============================================== Storage ========================================================

    bool public auto_convert;

    address public tokenRegistryContract;

    address public swapHelperContract;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(address tokenRegistry_, address swapHelper_) {
        tokenRegistryContract = tokenRegistry_;
        swapHelperContract = swapHelper_;
        auto_convert = false;
    }

    // =============================================== Getters ========================================================

    function claim(address token_) public onlyOwner {
        IERC20(token_).transfer(owner(), IERC20(token_).balanceOf(address(this)));
    }

    // =============================================== Internal =======================================================

}
