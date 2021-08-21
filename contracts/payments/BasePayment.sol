// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @dev BasePayment is a to accept payments with auto-convert function.
 */
contract BasePayment is Ownable {

    // =============================================== Storage ========================================================

    struct PaymentInformation {
        address user;
        uint256 block;
    }

    /// @dev payment instance unique id.
    string public ID;

    /// @dev amount to pay in DAI
    uint256 public amount;

    /// @dev TokenRegistry address
    address public registry;

    /// @dev payments history
    PaymentInformation[] private history;

    /// @dev users payments specific history
    mapping(address => PaymentInformation[]) private userHistory;


    // =============================================== Events =========================================================

    /// @dev Emitted by the `pay` function
    /// @param id payment instance unique id.
    //  @param amount payed to the instance.
    //  @param information the payment information.
    event Paid(string indexed id, uint256 indexed amount, PaymentInformation indexed information);

    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    /// @dev Constructor
    /// @param id_ payment instance unique id.
    //  @param amount_ amount to pay to emit the event.
    //  @param registry_ TokenRegistry address
    constructor(string memory id_, uint256 amount_, address registry_) {
        ID = id_;
        amount = amount_;
        registry = registry_;
    }


    // =============================================== Getters ========================================================

    /// @dev Returns the global payments history
    function getPaymentsHistory() public view returns (PaymentInformation[] memory) {
        return history;
    }

    /// @dev Get a specific user payment history
    /// @param user_ the address of the user to query
    function getUserPaymentsHistory(address user_) public view returns (PaymentInformation[] memory) {
        return userHistory[user_];
    }

    // =============================================== Internal =======================================================

    /// @dev Internal function to keep global and users payments history
    function _afterUserPayment() internal {
        PaymentInformation memory info = PaymentInformation(msg.sender, block.number);
        history.push(info);
        userHistory[msg.sender].push(info);
        emit Paid(ID, amount, info);
    }

}
