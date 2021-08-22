// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "../payments/RecurrentPayment.sol";
import "../payments/SubscriptionPayment.sol";

/**
 * @dev PointOfSale is the contract to submit payments.
 */
contract PointOfSale is Ownable {

    // =============================================== Storage ========================================================

    /// @dev Enum to define different payment contracts.
    enum PaymentType{ RECURRENT, SUBSCRIPTION }

    /// @dev TokensRegistry contract address
    address public tokenRegistryContract;

    /// @dev Struct to define a payment contract
    /// @param id Unique id for the payment instance.
    /// @param _type Type of payment.
    /// @param amount in DAI to charge.
    /// @param periodicity amount of blocks the payments should be charged.
    /// @param deployment is the address of the payment instance.
    struct Payment {
        string id;
        PaymentType _type;
        uint256 amount;
        uint256 periodicity;
        address deployment;
    }

    /// @dev Deployed payments for this POS.
    mapping(string => Payment) private payments;

    /// @dev Array of ids for payment instances deployed for this POS.
    string[] private _payments;


    // =============================================== Events =========================================================

    /// @dev Emitted by the `deployPayment` function.
    /// @param id Unique id for the payment instance.
    /// @param _type Type of payment.
    /// @param amount in DAI to charge.
    /// @param periodicity amount of blocks the payments should be charged.
    /// @param deployment is the address of the payment instance.
    event PaymentDeployed(
        string indexed id,
        PaymentType indexed _type,
        uint256 amount,
        uint256 periodicity,
        address indexed deployment
    );

    // =============================================== Setters ========================================================

    /// @dev Constrictor
    /// @param tokenRegistry_ The address of the supported tokens.
    constructor(address tokenRegistry_) {
        tokenRegistryContract = tokenRegistry_;
    }

    /// @dev create a new payment instance
    /// @param id is a unique identifier for this payment instance.
    /// @param _type Enum for the PaymentType
    /// @param amount amount in DAI to charge for the payment.
    /// @param periodicity (only required for Subscription Payments) is the amount of blocks it can be charged.
    function deployPayment(string memory id, PaymentType _type, uint256 amount, uint256 periodicity) public onlyOwner returns (address) {
        require(payments[id].deployment == address(0), "PointOfSale: payment id is already used");
        BasePayment i;
        if (_type == PaymentType.RECURRENT) {
            i = new RecurrentPayment(id, amount, tokenRegistryContract);
        }
        if (_type == PaymentType.SUBSCRIPTION) {
            i = new SubscriptionPayment(id, amount, tokenRegistryContract, periodicity);
        }
        payments[id] = Payment(id, _type, amount, periodicity, address(i));
        _payments.push(id);
        emit PaymentDeployed(id, _type, amount, periodicity, address(i));
        return address(i);
    }

    // =============================================== Getters ========================================================

    /// @dev Withdraws the selected token from the POS to the owner.
    /// @param token_ address of the token to withdraw.
    function claim(address token_) public onlyOwner {
        IERC20(token_).transfer(owner(), IERC20(token_).balanceOf(address(this)));
    }

    /// @dev Returns the ids of the payments instances from this POS
    function getPayments() public view onlyOwner returns (string[] memory) {
        return _payments;
    }

    /// @dev Returns payment by a specified id
    function getPayment(string memory id_) public view onlyOwner returns (Payment memory) {
        return payments[id_];
    }

}
