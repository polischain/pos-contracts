// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../payments/SinglePayment.sol";
import "../payments/RecurrentPayment.sol";
import "../payments/SubscriptionPayment.sol";

/**
 * @dev PointOfSale is the contract to submit payments.
 */
contract PointOfSale is Ownable {

    // =============================================== Storage ========================================================

    /// @dev Enum to define different payment contracts.
    enum PaymentType{ SINGLE, RECURRENT, SUBSCRIPTION }

    /// @dev Boolean to enable automatic token convertion to a stable coin.
    bool public auto_convert;

    /// @dev TokensRegistry contract address
    address public tokenRegistryContract;

    /// @dev SwapHelper contract address
    address public swapHelperContract;

    /// @dev Struct to define a payment contract
    struct Payment {
        PaymentType payment;
        string id;
        address deployment;
    }

    /// @dev Deployed payments for this POS.
    mapping(string => Payment) private payments;

    /// @dev Array of payments deployed for this POS.
    address[] private payments_;


    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(address tokenRegistry_, address swapHelper_) {
        tokenRegistryContract = tokenRegistry_;
        swapHelperContract = swapHelper_;
        auto_convert = false;
    }

    function setAutoConvert(bool convert_) public onlyOwner {
        auto_convert = convert_;
    }

    function deployPayment(string calldata id, PaymentType type_, uint256 amount, uint256 periodicity) public onlyOwner returns (address) {
        require(payments[id].deployment == address(0), "PointOfSale: payment id is already used");
        BasePayment i;
        if (type_ == PaymentType.SINGLE) {
            i = new SinglePayment(auto_convert, swapHelperContract, tokenRegistryContract, amount);
        }
        if (type_ == PaymentType.RECURRENT) {
            i = new RecurrentPayment(auto_convert, swapHelperContract, tokenRegistryContract, amount);
        }
        if (type_ == PaymentType.SUBSCRIPTION) {
            i = new SubscriptionPayment(periodicity, auto_convert, swapHelperContract, tokenRegistryContract, amount);
        }
        payments[id] = Payment(type_, id, address(i));
        return address(i);
    }

    // =============================================== Getters ========================================================

    function claim(address token_) public onlyOwner {
        IERC20(token_).transfer(owner(), IERC20(token_).balanceOf(address(this)));
    }

    // =============================================== Internal =======================================================

}
