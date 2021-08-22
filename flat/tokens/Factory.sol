// Sources flattened with hardhat v2.6.1 https://hardhat.org

// File @openzeppelin/contracts/utils/Context.sol@v4.3.0

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }
}


// File @openzeppelin/contracts/access/Ownable.sol@v4.3.0

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Contract module which provides a basic access control mechanism, where
 * there is an account (an owner) that can be granted exclusive access to
 * specific functions.
 *
 * By default, the owner account will be the one that deploys the contract. This
 * can later be changed with {transferOwnership}.
 *
 * This module is used through inheritance. It will make available the modifier
 * `onlyOwner`, which can be applied to your functions to restrict their use to
 * the owner.
 */
abstract contract Ownable is Context {
    address private _owner;

    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);

    /**
     * @dev Initializes the contract setting the deployer as the initial owner.
     */
    constructor() {
        _setOwner(_msgSender());
    }

    /**
     * @dev Returns the address of the current owner.
     */
    function owner() public view virtual returns (address) {
        return _owner;
    }

    /**
     * @dev Throws if called by any account other than the owner.
     */
    modifier onlyOwner() {
        require(owner() == _msgSender(), "Ownable: caller is not the owner");
        _;
    }

    /**
     * @dev Leaves the contract without owner. It will not be possible to call
     * `onlyOwner` functions anymore. Can only be called by the current owner.
     *
     * NOTE: Renouncing ownership will leave the contract without an owner,
     * thereby removing any functionality that is only available to the owner.
     */
    function renounceOwnership() public virtual onlyOwner {
        _setOwner(address(0));
    }

    /**
     * @dev Transfers ownership of the contract to a new account (`newOwner`).
     * Can only be called by the current owner.
     */
    function transferOwnership(address newOwner) public virtual onlyOwner {
        require(newOwner != address(0), "Ownable: new owner is the zero address");
        _setOwner(newOwner);
    }

    function _setOwner(address newOwner) private {
        address oldOwner = _owner;
        _owner = newOwner;
        emit OwnershipTransferred(oldOwner, newOwner);
    }
}


// File @openzeppelin/contracts/token/ERC20/IERC20.sol@v4.3.0

// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

/**
 * @dev Interface of the ERC20 standard as defined in the EIP.
 */
interface IERC20 {
    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by `account`.
     */
    function balanceOf(address account) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transfer(address recipient, uint256 amount) external returns (bool);

    /**
     * @dev Returns the remaining number of tokens that `spender` will be
     * allowed to spend on behalf of `owner` through {transferFrom}. This is
     * zero by default.
     *
     * This value changes when {approve} or {transferFrom} are called.
     */
    function allowance(address owner, address spender) external view returns (uint256);

    /**
     * @dev Sets `amount` as the allowance of `spender` over the caller's tokens.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * IMPORTANT: Beware that changing an allowance with this method brings the risk
     * that someone may use both the old and the new allowance by unfortunate
     * transaction ordering. One possible solution to mitigate this race
     * condition is to first reduce the spender's allowance to 0 and set the
     * desired value afterwards:
     * https://github.com/ethereum/EIPs/issues/20#issuecomment-263524729
     *
     * Emits an {Approval} event.
     */
    function approve(address spender, uint256 amount) external returns (bool);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient` using the
     * allowance mechanism. `amount` is then deducted from the caller's
     * allowance.
     *
     * Returns a boolean value indicating whether the operation succeeded.
     *
     * Emits a {Transfer} event.
     */
    function transferFrom(
        address sender,
        address recipient,
        uint256 amount
    ) external returns (bool);

    /**
     * @dev Emitted when `value` tokens are moved from one account (`from`) to
     * another (`to`).
     *
     * Note that `value` may be zero.
     */
    event Transfer(address indexed from, address indexed to, uint256 value);

    /**
     * @dev Emitted when the allowance of a `spender` for an `owner` is set by
     * a call to {approve}. `value` is the new allowance.
     */
    event Approval(address indexed owner, address indexed spender, uint256 value);
}


// File contracts/payments/BasePayment.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;


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


// File contracts/payments/RecurrentPayment.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;



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


// File contracts/payments/SubscriptionPayment.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;



/**
 * @dev SubscriptionPayment is a contract for subscription payments.
 *      Deployed inside a POS this contract will charge the subscribed
 *      users each times it is called as long as payment periodicity is passed.
 */
contract SubscriptionPayment is Ownable, BasePayment {

    // =============================================== Storage ========================================================

    /// @dev the amount of blocks on which the subscription is charged.
    uint256 public periodicity;

    // =============================================== Events =========================================================
    // ============================================== Modifiers =======================================================
    // =============================================== Setters ========================================================

    constructor(
        string memory id_,
        uint256 amount_,
        address registry_,
        uint256 periodicity_
    ) BasePayment(id_, amount_, registry_) {
        periodicity = periodicity_;
    }

    // =============================================== Getters ========================================================
    // =============================================== Internal =======================================================

}


// File contracts/pos/PointOfSale.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;




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

}


// File contracts/Factory.sol

// SPDX-License-Identifier: MIT
pragma solidity 0.8.4;


/**
 * @dev Factory contract deploys and stores implementations of Points-of-Sales
 *      each user is only available to deploy a single POS for each address.
 *      The factory stores the the required contracts for the POS to work.
 */
contract Factory is Ownable {

    // =============================================== Storage ========================================================

    /// @dev Returns the address of the user deployment.
    mapping (address => address) private deployments;

    /// @dev active boolean enable/disable POS deployments.
    bool public active;

    /// @dev tokensRegistry is the contract to whitelist tokens.
    address public tokensRegistry;

    // =============================================== Events ========================================================


    /// @dev Emitted by the `deploy` function
    /// @param user The address that deployed the POS.
    //  @param implementation The address of the POS deployment.
    event Deployed(address indexed user, address indexed implementation);

    // ============================================== Modifiers =======================================================

    /**
     * @dev Modifier that checks if `active` is enabled.
    */
    modifier onlyActive() {
        require(active, "Factory: not active");
        _;
    }

    // =============================================== Setters ========================================================

    /// @dev Constructor.
    /// @param tokensRegistry_ The address of the proxy implementation of the `TokenRegistry` contract.
    constructor(address tokensRegistry_) {
        active = false;
        tokensRegistry = tokensRegistry_;
    }

    /// @dev enables or disables the contract to deploy POS contracts.
    /// @param active_ Enable or disable the Factory contract
    function setActive(bool active_) external onlyOwner {
        active = active_;
    }

    /// @dev deploys a POS contract with the `msg.sender` as the owner.
    ///      It only requires the user to have no previous deployment.
    function deploy() external onlyActive returns(PointOfSale) {
        require(deployments[msg.sender] != address(0), "Factory: user already has a deployment");
        PointOfSale p = new PointOfSale(tokensRegistry);
        return p;
    }

    // =============================================== Getters ========================================================

    /// @dev returns the address of the user POS.
    /// @param user_ User to query
    function getDeployment(address user_) public view returns(address) {
        return deployments[user_];
    }



}
