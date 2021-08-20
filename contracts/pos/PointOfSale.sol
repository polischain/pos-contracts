// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/erc20/IERC20.sol";

/**
 * @dev PointOfSale is the contract to submit payments.
 */
contract PointOfSale is Ownable {

    // =============================================== Storage ========================================================
    address public immutable DAI;

    bool public auto_convert;

    address public tokenRegistryContract;

    address public swapHelperContract;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(address dai_, address tokenRegistry_, address swapHelper_) {
        DAI = dai_;
        tokenRegistryContract = tokenRegistry_;
        swapHelperContract = swapHelper_;
        auto_convert = false;
    }

    // =============================================== Getters ========================================================

    function claim() public onlyOwner {
        IERC20(DAI).transfer(owner(), IERC20(DAI).balanceOf(address(this)));
    }

    // =============================================== Internal =======================================================

}
